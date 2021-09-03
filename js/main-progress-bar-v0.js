const renderWeightedPercent = (weightedPercent) => {
  const progressBarElement =
    document.querySelector(".progress-display")
  const progressLabelElement =
    document.querySelector("#upload-percentage")

  if (progressBarElement && progressLabelElement) {
    const stringWeightedPercentage = weightedPercent.toString()
    progressBarElement.setAttribute("value", stringWeightedPercentage)
    progressLabelElement.innerText = `${stringWeightedPercentage}%`
  }
}

const updateProgressBarCallback = (progressInformation) => {
  renderWeightedPercent(progressInformation.percentageProcessed)
}

function main() {
  document.querySelector("#start-upload-button").addEventListener("click", ()=> {
    document.querySelector("#progress-bar-and-message").removeAttribute("hidden")
    document.querySelector("#start-upload-button").setAttribute("hidden", "true")
    processFilesAndUpdateProgress(
      updateProgressBarCallback
    )
  })

}

setTimeout(main, 10)

/* ------------------------------------In another file.------------------------------------*/

// Files are processed and progress is updated.
const processFilesAndUpdateProgress = (progressCallback) => {
  let progressInformation = {percentageProcessed: 0}

  const updateProgress = () => {
    progressCallback(progressInformation)

    if (progressInformation.percentageProcessed >= 99) {

    } else {
      progressInformation.percentageProcessed += Math.round(Math.random() * 4) // add random increment for realism
      setTimeout(updateProgress, Math.round(Math.random() * 1500)) // make subsequent calls to update progress bar random for realism
    }
  }
  setTimeout(updateProgress, 3500) // // make initial call to update progress bar
}
