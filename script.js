

document.getElementById('input-box').addEventListener('input', function() {
    var input = document.getElementById('input-box').value;
    var preview = document.getElementById('preview');
    preview.innerHTML = `\\[ ${input} \\]`;
    MathJax.typesetPromise([preview]).catch(function (err) {
        preview.innerHTML = '';
        preview.appendChild(document.createTextNode(err.message));
    });
});


function insertAtCursor(text) {
    const textarea = document.getElementById('input-box');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos, textarea.value.length);
    textarea.selectionStart = textarea.selectionEnd = startPos + text.length;
    textarea.focus();
    updatePreview();
}

function updatePreview() {
    const input = document.getElementById('input-box').value;
    const preview = document.getElementById('preview');
    preview.innerHTML = `\\[ ${input} \\]`;;
    MathJax.typesetPromise([preview]).catch(function (err) {
        preview.innerHTML = '';
        preview.appendChild(document.createTextNode(err.message));
    });
}

document.getElementById('input-box').addEventListener('input', updatePreview);

// Render MathJax for the buttons on page load
window.addEventListener('load', function () {
    MathJax.typesetPromise();
});