import React from "react";
import Link from "next/link";
import Head from "next/head";

const links = [
  { href: "#", label: "Obscure Cam" },
  { href: "#", label: "Share Location" },
  { href: "#", label: "Secure Drop" },
  { href: "#", label: "Police ID" },
].map((link) => ({
  ...link,
  key: `nav-link-${link.href}-${link.label}`,
}));

const Nav = () => (
  <nav>
    <Head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=yes"
      />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />
      <title>Resist Tools</title>

      <link rel="manifest" href="/manifest.webmanifest" />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      <meta name="theme-color" content="#000000" />
    </Head>

    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>

      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <button class="add-button">Add to home screen</button>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
      .add-button {
        position: absolute;
        top: 1px;
        left: 1px;
      }
    `}</style>
  </nav>
);

export default Nav;
