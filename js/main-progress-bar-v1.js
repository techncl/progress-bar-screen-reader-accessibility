const throttleProgressBarUpdates = (
  updateProgressFunction,
  millisecondsToWait = 2000
) => {
  let lastExecutionTimestamp= 0
  let timeoutId = 0 // setTimeout returns only positive timeoutIds so set initial value to 0

  return (progressInformation) => {
    const currentTimestamp = Date.now()
    const timeSinceLastExecutionMillis =
      currentTimestamp - lastExecutionTimestamp

    if (timeSinceLastExecutionMillis > millisecondsToWait) {
      lastExecutionTimestamp = currentTimestamp
      timeoutId = 0
      updateProgressFunction(progressInformation)
    } else if (timeoutId > 0) {
      return
    } else {
      const nextExecutionDelayMillis =
        millisecondsToWait - timeSinceLastExecutionMillis
      timeoutId = setTimeout(() => {
        updateProgressFunction(progressInformation)
        lastExecutionTimestamp = Date.now()
        timeoutId = 0
      }, nextExecutionDelayMillis)

    }
  }
}

const renderWeightedPercent = (weightedPercent) => {
  const progressBarElement =
    document.querySelector(".progress-display")
  const progressLabelElement =
    document.querySelector("#upload-percentage")

  //calculation goes here

  if (progressBarElement && progressLabelElement) {
    const stringWeightedPercentage = weightedPercent.toString()
    progressBarElement.setAttribute("value", stringWeightedPercentage)
    progressLabelElement.innerText = `${stringWeightedPercentage}%`
  }
}

const updateProgressBarCallback = (progressInformation) => {
  renderWeightedPercent(progressInformation.percentageProcessed)
}

const updateScreenReaderCallback = (progressInformation) => {
  const screenReaderStatusElement =
    document.querySelector("#approximate-status")

  if(screenReaderStatusElement){
    screenReaderStatusElement.innerText = `${progressInformation.percentageProcessed}%`
  }
}

function main() {
  document.querySelector("#start-upload-button").addEventListener("click", ()=> {
    document.querySelector("#progress-bar-and-message").removeAttribute("hidden")
    document.querySelector("#start-upload-button").setAttribute("hidden", "true")

    const screenReaderCallback = throttleProgressBarUpdates(updateScreenReaderCallback)
    processFilesAndUpdateProgress(
      (progressInformation) => {
        updateProgressBarCallback(progressInformation)
        screenReaderCallback(progressInformation)
      }
    )
  })

}

setTimeout(main, 10)

/* ------------------------------------In another file.------------------------------------*/

// Files are processed and progress is updated.
const processFilesAndUpdateProgress = (throttledProgressCallback) => {
  let progressInformation = {percentageProcessed: 0}

  const updateProgress = () => {
    throttledProgressCallback(progressInformation)

    if (progressInformation.percentageProcessed >= 99) {

    } else {
      progressInformation.percentageProcessed += Math.round(Math.random() * 5) // add random increment for realism
      setTimeout(updateProgress, Math.round(Math.random() * 1800)) // make subsequent calls to update progress bar random for realism
    }
  }
  setTimeout(updateProgress, 100) // // make initial call to update progress bar
}
