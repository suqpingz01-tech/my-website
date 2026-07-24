        const popup = document.getElementById("age-popup");

        // ถ้าเคยกดยืนยันแล้วในแท็บนี้
        if (sessionStorage.getItem("ageVerified")) {
            popup.style.display = "none";
        }

        function acceptAge() {
            sessionStorage.setItem("ageVerified", "true");
            popup.style.display = "none";
        }

        function leaveSite() {
            window.location.href = "https://google.com";
        }