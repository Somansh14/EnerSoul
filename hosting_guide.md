# How to Host Your Website

This guide will show you how to easily host your new website. Since your website is built using standard HTML, CSS, and JavaScript (a "static" website), hosting it is very simple and can even be done for free. 

Here are the three easiest methods to get your website online.

---

## Method 1: The Easiest Way (Netlify Drop)
**Best for:** Quick, free hosting without needing technical knowledge or accounts (initially).

Netlify allows you to simply drag and drop your website folder to host it instantly.

1. **Download/Extract your files**: Ensure all the files we sent you (like `index.html`, `about.html`, the `css` folder, `images` folder, etc.) are together in a single folder on your computer.
2. Go to **[Netlify Drop](https://app.netlify.com/drop)** in your web browser.
3. Drag and drop the folder containing your website files into the circle on the Netlify Drop page.
4. Netlify will instantly upload the files and give you a live link (e.g., `https://random-name-12345.netlify.app`). 
5. *(Optional)* To keep the site online permanently and connect your own custom domain name (like `www.yourwebsite.com`), you will need to create a free Netlify account and follow their prompts to "Set up a custom domain."

---

## Method 2: Traditional Shared Hosting (cPanel / HostGator, Bluehost, GoDaddy)
**Best for:** If you already have a web hosting plan or want a traditional setup with email hosting.

If you have purchased hosting from a provider like GoDaddy, Bluehost, or HostGator, you can upload the files directly to your server.

1. Log into your hosting account's control panel (often called **cPanel**).
2. Look for the **File Manager** tool and open it.
3. Navigate to the `public_html` folder (this is where your main website files live).
4. If there are any default files in there (like a default `index.html` or `default.html` from your host), delete them.
5. Click **Upload** and select all the files and folders we sent you. 
   *(Tip: It's often easier to put all your files into a `.zip` file on your computer, upload the `.zip` file, and then right-click to "Extract" it inside the `public_html` folder).*
6. Make sure your main page is named exactly `index.html`.
7. Visit your domain name in the browser, and your site should be live!

---

## Method 3: Vercel (Developer Friendly & Fast)
**Best for:** Free, high-performance hosting.

Vercel is similar to Netlify and provides excellent free hosting for static websites.

1. Create a free account at **[Vercel](https://vercel.com/)**.
2. From your Vercel dashboard, click **Add New** > **Project**.
3. Under the "Deploy your code" section, look for **Deploy from a folder** or **Upload**.
4. Upload the folder containing your website files.
5. Vercel will deploy your site and provide you with a live URL (e.g., `https://your-site-name.vercel.app`).
6. In the project settings, you can go to **Domains** to connect your custom domain name.

---

### Need a Domain Name?
If you don't have a domain name yet (like `www.yourbrand.com`), you can purchase one through registrars like Namecheap, Google Domains (now Squarespace), or GoDaddy. Once purchased, you can link it to your hosting provider using their "Custom Domain" settings.
