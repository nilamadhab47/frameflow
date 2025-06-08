# 🔍 Search Engine Verification Setup Guide

## ✅ Files Updated
- ✅ Domain changed to `https://www.frameflow.online`
- ✅ Image URLs updated to use your Next.js optimized images
- ✅ Favicon set to `/logo.png`
- ✅ Sitemap and robots.txt updated

## 🚀 Next Steps: Get Verification Codes

### 1. Google Search Console
1. **Go to:** [Google Search Console](https://search.google.com/search-console/)
2. **Sign in** with your Google account
3. **Click:** "Add Property"
4. **Select:** "URL prefix" 
5. **Enter:** `https://www.frameflow.online/`
6. **Choose:** "HTML tag" verification
7. **Copy** the content value (looks like: `abcd1234efgh5678`)
8. **Paste it** in `app/layout.tsx` replacing `"your-google-verification-code-here"`

### 2. Bing Webmaster Tools  
1. **Go to:** [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. **Sign in** with Microsoft account
3. **Click:** "Add a site"
4. **Enter:** `https://www.frameflow.online/`
5. **Choose:** "HTML Meta tag"
6. **Copy** the content value
7. **Paste it** in `app/layout.tsx` replacing `"your-bing-verification-code-here"`

### 3. Yandex Webmaster
1. **Go to:** [Yandex Webmaster](https://webmaster.yandex.com/)
2. **Sign in** with Yandex account
3. **Click:** "Add site"
4. **Enter:** `https://www.frameflow.online/`
5. **Choose:** "Meta tag" verification
6. **Copy** the content value
7. **Paste it** in `app/layout.tsx` replacing `"your-yandex-verification-code-here"`

## 🔧 How to Update Verification Codes

Open `app/layout.tsx` and find this section:

```typescript
verification: {
  google: "your-google-verification-code-here", // ← Paste Google code here
  other: {
    "msvalidate.01": "your-bing-verification-code-here", // ← Paste Bing code here  
    "yandex-verification": "your-yandex-verification-code-here", // ← Paste Yandex code here
  }
},
```

### Example (after you get the codes):
```typescript
verification: {
  google: "abc123def456ghi789", 
  other: {
    "msvalidate.01": "xyz789abc123def456",
    "yandex-verification": "qwe456rty789uio123",
  }
},
```

## ✅ After Adding Codes

1. **Deploy your site** to production
2. **Go back** to each search engine console
3. **Click "Verify"** on each platform
4. **Wait** 24-48 hours for indexing to begin

## 🎯 Additional SEO Actions

### Submit Your Sitemap
After verification, submit your sitemap in each console:
- **Sitemap URL:** `https://www.frameflow.online/sitemap.xml`

### Monitor Performance
- **Google Search Console:** Track clicks, impressions, ranking
- **Bing Webmaster:** Monitor Bing search performance  
- **Yandex Webmaster:** Track Russian search performance

## 🔥 Pro Tips

1. **Google is priority #1** - Focus on Google verification first
2. **Bing powers DuckDuckGo** - Don't skip Bing setup
3. **Yandex for Russian markets** - Only if you target Russian users
4. **Check weekly** for crawl errors and performance data

---

**Need help?** All files are ready - just add the verification codes and deploy! 🚀 