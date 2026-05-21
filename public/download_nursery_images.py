#!/usr/bin/env python3
"""
Download all product images from gowthaminursery.in, organized by category.

Usage:
  python3 download_nursery_images.py --test   # download 1 image to confirm
  python3 download_nursery_images.py          # download everything
"""

import os
import re
import sys
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from pathlib import Path

BASE_URL = "https://www.gowthaminursery.in"
CATEGORIES = ["avenues", "bamboos", "bonsai", "olives", "palms", "topiaries"]
OUTPUT_DIR = Path(__file__).parent / "gallery"

# NOTE: do NOT use a persistent session — the site returns stripped pages
# when session cookies from the homepage are sent on category page requests.
# Fresh stateless requests work correctly.

PAGE_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}

IMAGE_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": BASE_URL + "/",
    "Connection": "keep-alive",
}


def sanitize_filename(name: str) -> str:
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name or "unnamed"


def full_size_url(url: str) -> str:
    """Strip WordPress thumbnail dimensions like -300x300 to get the original file."""
    return re.sub(r"-\d+x\d+(\.[a-zA-Z]+)$", r"\1", url)


def best_srcset_url(img_tag) -> str:
    """Return the largest-width URL from srcset, or fall back to src."""
    src = img_tag.get("src", "")

    for attr in ("srcset", "data-srcset"):
        srcset = img_tag.get(attr, "")
        if not srcset:
            continue
        best, best_w = src, 0
        for part in (p.strip() for p in srcset.split(",")):
            tokens = part.split()
            if len(tokens) == 2:
                u, w = tokens
                try:
                    w_int = int(w.rstrip("w"))
                    if w_int > best_w:
                        best_w, best = w_int, u
                except ValueError:
                    pass
        if best_w > 0:
            return best

    return src


def scrape_page(url: str):
    """
    Fetch one category listing page.
    Returns:
      products – list of (product_name, img_url)
      next_url – URL of next pagination page, or None
    """
    resp = requests.get(url, headers=PAGE_HEADERS, timeout=20)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    products = []
    for item in soup.select("li.product"):
        name_el = item.select_one(".woocommerce-loop-product__title, h2, h3")
        img = item.select_one("img")
        if not name_el or not img:
            continue

        name = name_el.get_text(strip=True)
        # srcset has the full-size entry (900w); fall back to stripping dimensions from src
        raw_url = best_srcset_url(img)
        img_url = full_size_url(urljoin(BASE_URL, raw_url))
        thumb_url = urljoin(BASE_URL, img.get("src", ""))
        products.append((name, img_url, thumb_url))

    next_link = soup.select_one("a.next.page-numbers, a[rel='next']")
    next_url = next_link["href"] if next_link else None
    return products, next_url


def download_image(primary: str, fallback: str, dest: Path) -> bool:
    """Download image to dest, trying primary URL first then fallback."""
    for url in dict.fromkeys(filter(None, [primary, fallback])):
        try:
            r = requests.get(url, headers=IMAGE_HEADERS, timeout=20, stream=True)
            if r.status_code == 200 and "image" in r.headers.get("Content-Type", ""):
                dest.parent.mkdir(parents=True, exist_ok=True)
                with open(dest, "wb") as f:
                    for chunk in r.iter_content(8192):
                        f.write(chunk)
                return True
        except requests.RequestException as exc:
            print(f"    warning: {exc}")
    return False


def download_category(category: str, limit: int | None = None) -> int:
    cat_dir = OUTPUT_DIR / category
    cat_dir.mkdir(parents=True, exist_ok=True)

    page_url = f"{BASE_URL}/product-category/{category}/"
    downloaded = 0
    page_num = 1

    while page_url:
        print(f"  page {page_num}: {page_url}")
        products, next_url = scrape_page(page_url)
        print(f"  → {len(products)} products")

        for name, img_url, thumb_url in products:
            if limit is not None and downloaded >= limit:
                return downloaded

            ext = os.path.splitext(urlparse(img_url).path)[1] or ".jpg"
            dest = cat_dir / f"{sanitize_filename(name)}{ext}"

            if dest.exists():
                print(f"    [skip]  {dest.name}")
                downloaded += 1
                continue

            print(f"    [dl]    {dest.name}")
            if download_image(img_url, thumb_url, dest):
                downloaded += 1
                print(f"            ✓ saved ({dest.stat().st_size // 1024} KB)")
            else:
                print(f"            ✗ failed")

            time.sleep(0.5)

        page_url = next_url
        page_num += 1
        if page_url:
            time.sleep(1.0)

    return downloaded


def main() -> None:
    test_mode = "--test" in sys.argv or "-t" in sys.argv

    if test_mode:
        print("TEST MODE — downloading 1 image from 'avenues'\n")
        count = download_category("avenues", limit=1)
        print(f"\nResult: {count} image(s) saved to {OUTPUT_DIR / 'avenues'}")
    else:
        print(f"Downloading all categories → {OUTPUT_DIR}\n")
        total = 0
        for cat in CATEGORIES:
            print(f"\n{'='*50}\nCATEGORY: {cat.upper()}\n{'='*50}")
            count = download_category(cat)
            total += count
            print(f"  subtotal: {count} images")
        print(f"\nAll done. Total: {total} images.")


if __name__ == "__main__":
    main()
