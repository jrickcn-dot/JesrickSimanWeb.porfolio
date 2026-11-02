const resumeButton = document.querySelector("#resumeButton");
const resumeDialog = document.querySelector("#resumeDialog");
const closeResumeButton = resumeDialog?.querySelector(".resume-dialog-close");
const introductionButton = document.querySelector("#introductionButton");
const introductionDialog = document.querySelector("#introductionDialog");
const closeIntroductionButton = introductionDialog?.querySelector(".resume-dialog-close");
const introductionVideo = introductionDialog?.querySelector("video");
const portraitVideo = document.querySelector(".portrait-video");
const portraitPlayButton = document.querySelector(".portrait-play-button");

if (portraitVideo && portraitPlayButton) {
    const playPortraitWithSound = () => {
        portraitVideo.muted = false;
        portraitVideo.play().then(() => {
            portraitPlayButton.hidden = true;
        }).catch((error) => {
            portraitPlayButton.hidden = false;
            if (error.name !== "NotAllowedError") {
                console.error("Could not play the profile video.", error);
            }
        });
    };

    portraitPlayButton.addEventListener("click", playPortraitWithSound);
    portraitVideo.addEventListener("play", () => {
        portraitPlayButton.hidden = true;
    });
    portraitVideo.addEventListener("error", () => {
        console.error("Could not load the profile video.", portraitVideo.error);
    });

    playPortraitWithSound();
}

function configureDialog(button, dialog, closeButton, onClose = () => {}) {
    if (!button || !(dialog instanceof HTMLDialogElement) || !closeButton) {
        return;
    }

    button.addEventListener("click", () => {
        if (!dialog.open) {
            dialog.showModal();
        }
    });

    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    dialog.addEventListener("close", onClose);
}

configureDialog(resumeButton, resumeDialog, closeResumeButton);

if (introductionVideo) {
    configureDialog(
        introductionButton,
        introductionDialog,
        closeIntroductionButton,
        () => {
            introductionVideo.pause();
            if (Number.isFinite(introductionVideo.duration)) {
                introductionVideo.currentTime = 0;
            }
        }
    );

    introductionButton?.addEventListener("click", () => {
        const playback = introductionVideo.play();
        playback.catch((error) => {
            console.error("Could not play the introduction video.", error);
        });
    });

    introductionVideo.addEventListener("error", () => {
        console.error("Could not load the introduction video.", introductionVideo.error);
    });
}
