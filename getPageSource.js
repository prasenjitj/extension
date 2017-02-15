 /**
 * Get dom content on page load.
 * @param {Object} document_root
 * @return {Object} The values fetched from html.
 */
function DOMtoString(document_root) {

    // var popup = document.getElementsByClassName("simple-image-button emailDetails")[0].click();
    //document.getElementsByClassName("caseHistoryMessageDetail")[0].style.display="none";
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += '<!DOCTYPE ' + node.name;
            html += (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '');
            html += (!node.publicId && node.systemId ? ' SYSTEM' : '');
            html += (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
     console.log('inside getPageSource');
     // console.log(html);

var table = document.querySelector("[summary='table to display partner data']");
var tr = table.querySelectorAll('tr');
var hpa = {};
var keys = [];
var values = [];
tr.forEach(function(item) {
    keys = item.querySelector('td.key').innerText.trim();
    values = item.querySelector('td.value').innerText.trim();
    hpa[keys] = values;
});

var realPrice = $('[name=realprice]').val();
var realTaxFees = $('[name=realtaxesfees]').val();


hpa['Real Price'] = realPrice;
hpa['Real Fees'] = realTaxFees;
console.log(JSON.stringify(hpa,null,2));
}

chrome.runtime.sendMessage({
    action: 'getSource',
    source: DOMtoString(document)
});
