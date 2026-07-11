export function initializeCalculator(onSubmit) {

    const input = document.getElementById("answer");

    document.querySelectorAll(".calculator button").forEach(button => {

        button.addEventListener("click", () => {

            const value = button.dataset.value;

            if (value !== undefined) {

                input.value += value;
                input.focus();

                return;

            }

            switch (button.id) {

                case "clear":

                    input.value = "";
                    input.focus();

                    break;

                case "submit":

                    onSubmit();

                    break;

            }

        });

    });

    input.addEventListener("keydown", e => {

        if (e.key >= "0" && e.key <= "9") {
            return;
        }

        if (e.key === "Backspace") {
            return;
        }

        if (e.key === "Delete") {

            e.preventDefault();

            input.value = "";

            return;

        }

        if (e.key === "Enter") {

            e.preventDefault();

            onSubmit();

            return;

        }

        e.preventDefault();

    });

}