export default function copyRightDate() {
    document.querySelector(".copyrightDate").innerHTML = new Date().getFullYear();
}