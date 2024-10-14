let clickCount = 0;

function revealWord(element) {
    element.classList.toggle("revealed");
    clickCount++;
    document.getElementById("click-counter").textContent = clickCount;
}

function hideTemporarily(selector, delay) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add("hidden"); 

        setTimeout(() => {
            element.classList.remove("hidden");
        }, delay);
    }
}

window.onload = function() {
    hideTemporarily(".masked-word-timer1", 5000);
    hideTemporarily(".masked-word-timer2", 10000);
};
