export default function autoWidth() {
    this.style.height = 'auto';
    if (this.clientHeight !== this.scrollHeight) this.style.height = this.scrollHeight + 'px';
}