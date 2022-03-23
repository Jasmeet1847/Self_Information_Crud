var fname, flastname, femail, ffather, fmother, fgender, faddress;
var nameclr, lastnameclr, emailclr, genderclr, addressclr;
var editkey = -1;
$(document).ready(function () {
  //gender autocomplte
  var genderautocomplete = ["Male", "Female"];
  $("#gender").autocomplete({
    source: genderautocomplete,
  });
  //father autocomplte
  // $("#father").click(function () {
  fatherautocomplete();
  // });
  //mother autocomplte
  // $("#mother").click(function () {
  motherautocomplete();
  // });
  //save button
  $("#savebtn").click(function () {
    let check_validations = validations();
    if (check_validations) {
      savedata();
    }
  });
  //search button
  $("#search").keyup(function () {
    searchval();
  });
});
function validations() {
  let a = validate_name();
  let b = validate_lastname();
  let c = validate_email();
  let d = validate_gender();
  let e = validate_address();
  validate_father();
  validate_mother();
  if (a && b && c && d && e) {
    return true;
  } else {
    return false;
  }
}
function validate_name() {
  //debugger;
  fname = $("#name").val();
  nameclr = true;
  var regex = /^[a-zA-Z ]{2,30}$/;
  console.log(regex.test(fname));
  if (fname == "") {
    $("#name-error").text("empty name*");
    $("#name-error").css("color", "red");
    nameclr = false;
  } else {
    $("#name-error").text("");
  }
  if (fname != "") {
    if (regex.test(fname)) {
      //$("#name-error").text("");
    } else {
      $("#name-error").text("name should consist of characters only*");
      $("#name-error").css("color", "red");
      nameclr = false;
    }
    if (fname.length > 4 && fname.length < 10) {
      //$("#name-error").text("");
    } else {
      $("#name-error").text("length of name should btw 4 and 10");
      $("#name-error").css("color", "red");
      nameclr = false;
    }
  }
  return nameclr;
}
function validate_lastname() {
  //debugger;
  flastname = $("#lastname").val();
  lastnameclr = true;
  var regex = /^[a-zA-Z ]{2,30}$/;
  console.log(regex.test(flastname));
  if (flastname == "") {
    $("#lastname-error").text("empty lastname*");
    $("#lastname-error").css("color", "red");
    lastnameclr = false;
  } else {
    $("#lastname-error").text("");
  }
  if (flastname != "") {
    if (regex.test(flastname)) {
      $("#lastname-error").text("");
    } else {
      $("#lastname-error").text("lastname should consist of characters only*");
      $("#lastname-error").css("color", "red");
      lastnameclr = false;
    }
    if (flastname.length > 4 && flastname.length < 10) {
      $("#lastname-error").text("");
    } else {
      $("#lastname-error").text("length of lastname should btw 4 and 10*");
      $("#lastname-error").css("color", "red");
      lastnameclr = false;
    }
  }
  return lastnameclr;
}
function validate_email() {
  femail = $("#email").val();
  emailclr = true;
  if (femail == "") {
    $("#email-error").text("empty email*");
    $("#email-error").css("color", "red");
  } else {
    $("#email-error").text("");
  }
  if (femail != "") {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(femail)) {
    } else {
      $("#email-error").text("invalid email*");
      $("#email-error").css("color", "red");
      emailclr = false;
    }
  }
  if (editkey == -1) {
    var savedEmails = JSON.parse(localStorage.getItem("key1"));
    if (savedEmails) {
      for (let i = 0; i < savedEmails.length; i++) {
        if (femail == savedEmails[i].email) {
          $("#email-error").text("email exist*");
          $("#email-error").css("color", "red");
          emailclr = false;
        }
      }
    }
  }
  return emailclr;
}
function validate_gender() {
  fgender = $("#gender").val();
  genderclr = true;
  if (fgender == "") {
    $("#gender-error").text("empty gender*");
    $("#gender-error").css("color", "red");
    genderclr = false;
  } else {
    $("#gender-error").text("");
  }
  if (fgender != "") {
    $("#gender-error").text("");
  }
  return genderclr;
}
function validate_address() {
  faddress = $("#address").val();
  addressclr = true;
  if (faddress == "") {
    $("#address-error").text("empty address*");
    $("#address-error").css("color", "red");
    addressclr = false;
  } else {
    $("#address-error").text("");
  }
  if (faddress != "") {
    $("#address-error").text("");
  }
  return addressclr;
}
function validate_father() {
  ffather = $("#father").val();
  if (ffather == "") {
    $("#father-error").text("empty fathers name*");
    $("#father-error").css("color", "red");
  } else {
    $("#father-error").text("");
  }
  if (ffather != "") {
    $("#father-error").text("");
  }
}
function validate_mother() {
  fmother = $("#mother").val();
  if (fmother == "") {
    $("#mother-error").text("empty mothers name*");
    $("#mother-error").css("color", "red");
  } else {
    $("#mother-error").text("");
  }
  if (fmother != "") {
    $("#mother-error").text("");
  }
}
function fatherautocomplete() {
  // debugger;
  let data = JSON.parse(localStorage.getItem("key1"));
  console.log(data);
  $("#father").html(
    `<option selected="selected" disabled="disabled" >Select</option>`
  );
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].gender == "male") {
        $("#father").append(
          `<option value="${data[i].fullname}">${data[i].fullname}</option>`
        );
      }
    }
  }
}

function motherautocomplete() {
  //debugger;
  let data = JSON.parse(localStorage.getItem("key1"));
  $("#mother").html(
    `<option selected="selected" disabled="disabled" >Select</option>`
  );
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].gender == "female") {
        $("#mother").append(
          `<option value="${data[i].fullname}">${data[i].fullname}</option>`
        );
      }
    }
  }
}

var fchanged = 1;

$("#father").change(function () {
  fchanged = 0;
  debugger;
  var savedfname = JSON.parse(localStorage.getItem("key1"));
  if (savedfname) {
    for (let i = 0; i < savedfname.length; i++) {
      if (
        $("#father").val() == savedfname[i].fullname &&
        $("#email").val() == savedfname[i].email
      ) {
        $("#address").text(savedfname[i].address);
      }
    }
  }
});
$("#father").click(function () {
  fchanged = 0;
  debugger;
  var savedfname = JSON.parse(localStorage.getItem("key1"));
  if (savedfname) {
    for (let i = 0; i < savedfname.length; i++) {
      if (
        $("#father").val() == savedfname[i].fullname &&
        $("#email").val() == savedfname[i].email
      ) {
        $("#address").text(savedfname[i].address);
      }
    }
  }
});

if (fchanged) {
  $("#mother").change(function () {
    debugger;
    var savedfname = JSON.parse(localStorage.getItem("key1"));
    for (let i = 0; i < savedfname.length; i++) {
      if (
        $("#mother").val() == savedfname[i].fullname &&
        $("#mother").val() == savedfname[i].email
      ) {
        $("#address").text(savedfname[i].address);
      }
    }
  });
  $("#mother").click(function () {
    debugger;
    var savedfname = JSON.parse(localStorage.getItem("key1"));
    for (let i = 0; i < savedfname.length; i++) {
      if (
        $("#mother").val() == savedfname[i].fullname &&
        $("#email").val() == savedfname[i].email
      ) {
        $("#address").text(savedfname[i].address);
      }
    }
  });
}

function savedata() {
  debugger;
  console.log(fname + flastname);
  let arr = [];
  let obj = {};
  obj["fullname"] = fname.toLowerCase() + " " + flastname.toLowerCase();
  if (ffather) {
    obj["father"] = ffather.toLowerCase();
  } else {
    obj["father"] = ffather;
  }
  if (fmother) {
    obj["mother"] = fmother.toLowerCase();
  } else {
    obj["mother"] = fmother;
  }
  obj["email"] = femail.toLowerCase();
  obj["gender"] = fgender.toLowerCase();
  obj["address"] = faddress.toLowerCase();
  if (editkey != -1) {
    let data = JSON.parse(localStorage.getItem("key1"));
    for (let i = 0; i < data.length; i++) {
      if (i == editkey) {
        data[i].fullname = fname.toLowerCase() + " " + flastname.toLowerCase();
        if (ffather) {
          data[i].father = ffather.toLowerCase();
        }
        if (fmother) {
          data[i].mother = fmother.toLowerCase();
        }
        data[i].email = femail.toLowerCase();
        data[i].gender = fgender.toLowerCase();
        data[i].address = faddress.toLowerCase();
      }
    }
    localStorage.setItem("key1", JSON.stringify(data));
  } else {
    let json = JSON.parse(localStorage.getItem("key1"));
    if (json == null) {
      arr.push(obj);
      localStorage.setItem("key1", JSON.stringify(arr));
    } else {
      json.push(obj);

      localStorage.setItem("key1", JSON.stringify(json));
    }
  }
  prindata();
  $("#name").val("");
  $("#lastname").val("");
  $("#father").val();
  $("#email").val("");
  $("#mother").val("");
  $("#gender").val("");
  $("#address").val("");
  motherautocomplete();
  fatherautocomplete();
}

function prindata() {
  //debugger;
  let rows;
  let data = JSON.parse(localStorage.getItem("key1"));
  $("#root").html("");
  if (data) {
    for (let i = 0; i < data.length; i++) {
      rows += `<tr id=${i}>
    <td>${data[i].fullname}</td>
    <td>${data[i].father}</td>
    <td>${data[i].mother}</td>
    <td>${data[i].email}</td>
    <td>${data[i].gender}</td>
    <td>${data[i].address}</td>
    <td><button type="button" id=${i} onclick="Edit(${i})">Edit</button></td>
     <td><button type="button" id=${i} onclick="Delete(${i})">Delete</button></td></tr>`;
    }
    $("#root").html(rows);
  }
}

function Delete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      let data = JSON.parse(localStorage.getItem("key1"));
      console.log(typeof data, data);
      data.splice(id, 1);
      localStorage.setItem("key1", JSON.stringify(data));
      prindata();
    }
  });
}

function Edit(id) {
  editkey = id;
  let data = JSON.parse(localStorage.getItem("key1"));
  for (let i = 0; i < data.length; i++) {
    if (id == i) {
      let a = data[i].fullname;
      console.log(a);
      let b = a.split(" ");
      console.log(b[0]);
      $("#name").val(b[0]);
      $("#lastname").val(b[1]);
      $("#email").val(data[i].email);
      $("#gender").val(data[i].gender);
      $("#address").val(data[i].address);

      $("#father").html("");
      for (let i = 0; i < data.length; i++) {
        if (data[i].father != null) {
          $("#father").append(`<option>${data[i].father}</option>`);
        }
      }
      $("#father").val(data[i].father);
      // $("#father").html(`<option>${data[i].father}</option>`);
      $("#mother").html("");
      for (let i = 0; i < data.length; i++) {
        if (data[i].mother != null) {
          $("#mother").append(`<option>${data[i].mother}</option>`);
        }
      }
      // $("#mother").html(`<option>${data[i].mother}</option>`);
      $("#mother").val(data[i].mother);
    }
  }
}
function searchval() {
  //debugger;
  console.log("hj");
  let rows = "";
  $("#root").html("");
  let val = $("#search").val().toLowerCase();
  console.log(val);
  let data = JSON.parse(localStorage.getItem("key1"));
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].fullname.includes(val) ||
      //data[i].father.includes(val) ||
      //data[i].mother.includes(val) ||
      data[i].email.includes(val) ||
      data[i].gender.includes(val) ||
      data[i].address.includes(val)
    ) {
      rows += `<tr id=${i}>
    <td>${data[i].fullname}</td>
    <td>${data[i].father}</td>
    <td>${data[i].mother}</td>
    <td>${data[i].email}</td>
    <td>${data[i].gender}</td>
    <td>${data[i].address}</td>
    <td><button type="button" id=${i} onclick="Edit(${i})">Edit</button></td>
     <td><button type="button" id=${i} onclick="Delete(${i})">Delete</button></td></tr>`;
    }
  }
  $("#root").html(rows);
}
prindata();
