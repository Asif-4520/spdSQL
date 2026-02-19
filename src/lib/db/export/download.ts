const downloadFile = (
    content: string | Uint8Array | ArrayBuffer,
    filename: string,
    type: string
): void => {
    let blob: Blob;
    if (content instanceof Uint8Array) {
        const arrayBuffer = new ArrayBuffer(content.byteLength);
        new Uint8Array(arrayBuffer).set(content);
        blob = new Blob([arrayBuffer], { type });
    } else {
        blob = new Blob([content], { type });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export { downloadFile };
