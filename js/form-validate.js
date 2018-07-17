/**
 * ************************************
 * FORM VALIDATION
 *  ***********************************
 */

/**
 * Validate for empty fields and invalid fields
 */
function validate() {
  try{
    if (!firebase.auth().currentUser){
      // User not logged in
      $("#signupNotice").modal('show');
      return false;
    }

    var startDate = $("#startDate");
    var endDate = $("#endDate");
    var startTime = $("#startTime");
    var endTime = $("#endTime");
    var urlFields = $('input[name^="uploaded_images"]');
    var tags = $("#tags");
    var isAllDay = $("#isAllDay");

    var formControls = $(".form-control.addevent");
    var timeControls = $(".form-control.addevent-isallday");

    var validText = $("#valid_text");
    var invalidText = $("#invalid_text");

    // Hide all error messages
    formControls.removeClass("is-invalid");
    timeControls.removeClass("is-invalid");
    validText.css("display", "none");
    invalidText.css("display", "none");

    // Check for empty field
    if (!validateEmptyFields(formControls, invalidText)) return false;
    // Check for no images
    if (!validateNoImages(urlFields, invalidText)) return false;
    // Check for invalid time 
    if (!isAllDay.is(":checked")) {
      // Check for invalid date field
      if (!validateEmptyFields(timeControls, invalidText)) return false;
    }else{
      // Change time fields
      startTime.val( "00:00");
      endTime.val( "23:59");
    }
    if (!validateDateFields(startDate, endDate, startTime, endTime, invalidText)) return false;
    
    // Check for invalid no of tags
    if (!validateTags(tags, invalidText)) return false;

    // Validated
    validText.css("display", "inline");
    console.log("Form validated");
    return true;
  //return true;
  }catch(e){
    console.log(e);
    return false;
  }
}

/**
 * Validate empty fields
 */
function validateEmptyFields(formControls, invalidText) {
  var isEmptyField = false;
  formControls.each(function (_, element) {
    if ($(element).val() === "") {
      $(element).addClass("is-invalid");
      isEmptyField = true;
      changeSubmitObjText(invalidText, "Empty Field");
      return false;
    }
  });
  return (!isEmptyField);
}

/**
 * Validate no images
 */
function validateNoImages(urlFields, invalidText){
  var isValid = (urlFields.length != 0);
  if (!isValid){
    changeSubmitObjText(invalidText, "No Images Selected");
  }
  return isValid;
}

/**
 * Validate for date fields
 */
function validateDateFields(startDate, endDate, startTime, endTime, invalidText) {
  // Important
  // TODO: Not sure if this algo is correct
  var startDateVal = new Date(startDate.val() + " " + startTime.val());
  var endDateVal = new Date(endDate.val() + " " + endTime.val());
  var today = new Date()

  if (today > endDateVal) {
    // Today Greater than End Date
    endDate.addClass("is-invalid");
    changeSubmitObjText(invalidText, "Invalid Date : Event cannot have already ended.");
    return false;
  }
  // Chack if 2 dates are valid
  if (startDateVal > endDateVal) {
    // Start Date Greater than End Date
    startDate.addClass("is-invalid");
    endDate.addClass("is-invalid");
    startTime.addClass("is-invalid");
    endTime.addClass("is-invalid");
    changeSubmitObjText(invalidText, "Invalid Date : Event should end after starting date.");
    return false;
  }
  return true;
}

/**
 * validate for tags by getting no of tags
 */
function validateTags(tags, invalidText) {
  // Chack if 2 times are valid
  if (tags.val().split(" ").length > 15) {
    // Start Time Greater than End Time
    tags.addClass("is-invalid");
    changeSubmitObjText(invalidText, "Invalid Tags : No of Tags exceed 15.");
    return false;
  }
  return true;
}

/**
 * Helper function to change submitted text
 */
function changeSubmitObjText(element, text) {
  element.find(".text").text(text);
  element.css("display", "inline");
}