document.querySelectorAll('.dropdown').forEach((dropdown) => {
    let toggle = dropdown.querySelector('.dropdown-toggle');
    let dropdownEl = dropdown.querySelector('[data-ld-dropdown]');

    let togglePos, ldOffsetX, ldOffsetY;

    update();
    position();

    toggle.onclick = (e) => {
        e.preventDefault();
        dropdownEl.classList.contains("show") ? dropdownEl.classList.remove("show") : dropdownEl.classList.add("show") ;
    }
    document.addEventListener('click', (e) => {
        e.preventDefault();
        if (!dropdownEl.contains(e.target) && toggle != e.target) {
            dropdownEl.classList.remove("show");
        }
    });

    function position() {
        dropdownEl.style.setProperty('--ld-offset-x', ldOffsetX);
        dropdownEl.style.setProperty('--ld-offset-y', ldOffsetY);
    }

    function update() {
        togglePos = toggle.getBoundingClientRect();
        if (togglePos.left + dropdownEl.offsetWidth >= window.innerWidth) {
            ldOffsetX = -dropdownEl.offsetWidth + toggle.offsetWidth + (dropdownEl.attributes['data-offset-y'] ?? 0) + "px";
        }
        else {
            ldOffsetX = (dropdownEl.attributes['data-offset-x'] ?? 0) + "px";
        }

        ldOffsetY = (dropdownEl.attributes['data-offset-y'] ?? 48) + "px";                      
    }
});