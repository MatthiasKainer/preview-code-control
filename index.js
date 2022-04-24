import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@latest/es/core.min.js?module';
import javascript from 'https://unpkg.com/@highlightjs/cdn-assets@latest/es/languages/javascript.min.js?module';
import xml from 'https://unpkg.com/@highlightjs/cdn-assets@latest/es/languages/xml.min.js?module';
import { html } from "https://unpkg.com/lit@latest?module";
import { css } from "https://unpkg.com/nested-css-to-flat@latest/lit-css?module";
import { unsafeHTML } from "https://unpkg.com/lit@latest/directives/unsafe-html.js?module";
import { pureLit, useState } from "https://unpkg.com/pure-lit@latest?module";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml);

fetch("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/styles/base16/dracula.min.css")
    .then(response => response.text())
    .then(styles => {
        pureLit("preview-code-control", async (el) => {
            const {location} = el;
            const show = el.show.split(",")
            const tab = useState(el, show[0])
            const [code, xml] = await Promise.all([
                fetch(`${location}/index.js`).then(response => response.status < 399 ? response.text() : Promise.resolve("")),
                fetch(`${location}/index.html`).then(response => response.status < 399 ? response.text() : Promise.resolve(""))
            ]);
            const views = {
                code: html`<section><pre><code class="hljs">${unsafeHTML(hljs.highlight(code, {language: 'javascript'}).value)}</code></pre></section>`,
                html: html`<section><pre><code class="hljs">${unsafeHTML(hljs.highlight(xml, {language: 'html'}).value)}</code></pre></section>`,
                preview: html`<section>
                    <iframe srcdoc="${("<style>html, body, span, p, h1, h2, h3, h4, h5, div {color: rgb(233, 233, 244);} </style><script type='module'>" + code + "</script>" + xml)}"></iframe>
                </section>`
            }
            return html`
            <article class="tabs">
                <ul>
                    ${show.map(entry => html`<li class="${entry === tab.get() ? "active" : ""}" @click="${() => tab.set(entry)}">${entry}</li>`)}
                </ul>
                ${views[tab.get()] || null}
            </article>`;
        }, {
            styles: [
                css`
                    iframe {
                        border: 0;
                        width: 100%;
                        height: 100%;
                        background: rgb(40, 41, 54);
                        color: rgb(233, 233, 244);
                    }
                    ul {
                        margin: 0;
                        padding:0;
                        list-style: none;
                        display: flex;
                        width: 100%;

                        & li {
                            cursor: pointer;                        
                            flex-grow: 1;
                            padding: 0px 20px;
                        }
                        & li:hover {
                            font-style: italic;
                            border-bottom: 3px solid rgb(235, 255, 135);
                        }
                        & li.active {
                            font-style: italic;
                            border-bottom: 3px solid #ff79c6;
                        }
                    }
                    article {
                        & section
                        {
                            box-shadow: 0 3px 3px rgba(0,0,0,0.1);
                            z-index: 0;

                            &:target
                            {
                                display: block;
                            }
                        }
                    }

                    pre {
                        margin-top: 0;
                    }
                    pre code {
                        display: block;
                        overflow-x: auto;
                        padding: 1em;
                        font-size: smaller;
                    }
                    ${styles}`
            ],
            defaults: {
                location: "",
                show: "code,html,preview"
            }
        });
    })


