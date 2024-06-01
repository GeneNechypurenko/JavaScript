
function HtmlElement(tagName, isSelfClosing = false, content = '') {
    this.tagName = tagName;
    this.isSelfClosing = isSelfClosing;
    this.content = content;
    this.attributes = [];
    this.styles = [];
    this.children = [];

    this.setAttribute = function(name, value) {
        this.attributes.push({ name, value });
    };

    this.setStyle = function(name, value) {
        this.styles.push({ name, value });
    };

    this.appendChild = function(element) {
        this.children.push(element);
    };

    this.prependChild = function(element) {
        this.children.unshift(element);
    };

    this.getHtml = function() {
        let html = `<${this.tagName}`;

        this.attributes.forEach(attr => {
            html += ` ${attr.name}="${attr.value}"`;
        });

        if (this.styles.length > 0) {
            html += ' style="';
            this.styles.forEach(style => {
                html += `${style.name}: ${style.value}; `;
            });
            html += '"';
        }

        if (this.isSelfClosing) {
            html += ' />';
        } else {
            html += '>';
            html += this.content;

            this.children.forEach(child => {
                html += child.getHtml();
            });

            html += `</${this.tagName}>`;
        }

        return html;
    };
}

const wrapper = new HtmlElement('div');
wrapper.setAttribute('id', 'wrapper');
wrapper.setStyle('width', '40%');
wrapper.setStyle('margin', '0 auto');
wrapper.setStyle('background-color', 'white');
wrapper.setStyle('text-align', 'center');
wrapper.setStyle('border', '2px solid #000');
wrapper.setStyle('box-shadow', '0 0 10px rgba(0, 0, 0, 0.1)');
wrapper.setStyle('padding', '20px');
wrapper.setStyle('z-index', '1');

const header = new HtmlElement('h1');
header.content = 'What is Lorem Ipsum?';

const paragraph = new HtmlElement('p');
paragraph.content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a type specimen book. It has survived
not only five centuries, but also the leap into electronic typesetting, remaining essentially
unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
including versions of Lorem Ipsum.`;

const link = new HtmlElement('a');
link.setAttribute('href', 'https://www.lipsum.com/');
link.setStyle('display', 'block');
link.setStyle('margin-top', '20px');
link.content = 'Read more about Lorem Ipsum';

wrapper.appendChild(header);
wrapper.appendChild(paragraph);
wrapper.appendChild(link);

document.write(wrapper.getHtml());