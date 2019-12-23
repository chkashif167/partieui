function toggleClass(event, className) {
  event.currentTarget.classList.toggle(className);
}

/**
 * Password Strength Calculation and Formatting
 */
var password = document.querySelector("input[type='password']");
var meter = document.querySelector(".password-meter");

if (password) {
  password.addEventListener("input", function() {
    var val = password.value;
    var result = zxcvbn(val);

    if (val === "") {
      meter.setAttribute("data-password-strength", "");
    } else {
      meter.setAttribute("data-password-strength", result.score.toString());
    }
  });
}

/**
 * Search input
 */
var searchInput = document.querySelector(".search-input");
var searchField = document.getElementById("search");

if (searchField) {
  var cancel = document.querySelector(".search-input .cancel");

  var floatingCta = document.querySelector(".btn-floating-cta");
  var tapBar = document.querySelector(".tap-bar");

  searchField.addEventListener("input", function(e) {
    var searchTerm = e.target.value;
    console.log(searchTerm);

    if (searchTerm === "" && searchInput.classList.contains("active")) {
      searchInput.classList.remove("active");
    } else if (!searchInput.classList.contains("active")) {
      searchInput.classList.add("active");
    }
  });

  searchField.addEventListener("focus", function() {
    floatingCta.classList.add("hidden");
    tapBar.classList.add(("hidden"));
  });

  searchField.addEventListener("blur", function() {
    floatingCta.classList.remove("hidden");
    tapBar.classList.remove(("hidden"));
  });

  cancel.addEventListener("click", function() {
    searchField.value = "";
    searchInput.classList.remove("active");
    floatingCta.classList.remove("hidden");
    tapBar.classList.remove(("hidden"));
  });
}

/**
 * New Post
 */

// Visibility toggle
var toggleButton = document.querySelector(".new-post-header .btn-outline");

if (toggleButton) {
  var visibilityMessage = document.querySelector(".new-post-header .visibility");

  toggleButton.addEventListener("click", function() {
    var visibility = toggleButton.getAttribute("data-visibility");
    if (visibility === "public") {
      toggleButton.innerHTML = "Protected";
      toggleButton.setAttribute("data-visibility", "protected");
      visibilityMessage.textContent = "Visible to followers only";
    } else {
      toggleButton.innerHTML = "Public";
      toggleButton.setAttribute("data-visibility", "public");
      visibilityMessage.textContent = "Visible to everyone";
    }
  })
}

// Post input
var postInput = document.getElementById("post-content");

if (postInput) {
  var submitButton = document.getElementById("post");

  postInput.addEventListener("input", function(e) {
    var input = e.target.value;

    if (input !== "") {
      if (toggleButton) toggleButton.classList.remove("muted");
      submitButton.classList.remove("btn-disabled");
    } else {
      if (toggleButton) toggleButton.classList.add("muted");
      submitButton.classList.add("btn-disabled");
    }
  })
}

/**
 * Feed Menu
 */
var feedMenu = document.querySelector(".menu-drawer");
var feedToggles = document.querySelectorAll(".status-meta .btn-menu");
var overlay;
var overlayListener;

var toggleFeedMenu = function() {
  if (feedMenu.classList.contains("active")) {
    feedMenu.classList.remove("active");
    if (overlay && overlayListener) overlay.removeEventListener(overlayListener);
    if (overlay) overlay.parentNode.removeChild(overlay);
  } else {
    feedMenu.classList.add("active");
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    overlayListener = overlay.addEventListener("click", toggleFeedMenu);
  }
};

if (feedMenu && feedToggles) {
  feedToggles.forEach(function(toggle) {
    toggle.addEventListener("click", toggleFeedMenu);
  });
}

/**
 * Profile Header
 * @param timeScale
 */
function getDashOffset(levelIndicator, completeBar) {
  if (!levelIndicator || !completeBar) return;

  var percent = parseInt(levelIndicator.getAttribute("data-percentage"));
  var radius = parseInt(completeBar.getAttribute("r"));
  var circumference = 2 * Math.PI * radius;

  return circumference - ((percent * circumference) / 100);
}

function setProgressBar() {
  var levelIndicator = document.querySelector(".profile-avatar .level-indicator");

  if (!levelIndicator) return;

  var completeBar = levelIndicator.querySelector(".complete");
  var dashOffset = getDashOffset(levelIndicator, completeBar);

  TweenMax.to(completeBar, 1, { "stroke-dashoffset": dashOffset });
}

setProgressBar();

function tweenProfileHeader(collapsed, timeScale) {
  var avatarWrapper = document.querySelector(".profile-avatar");
  var levelIndicator = document.querySelector(".profile-avatar .level-indicator");
  var completeBar = levelIndicator.querySelector(".complete");
  var onlineIndicator = document.querySelector(".profile-avatar .online-indicator");
  var profileName = document.querySelector(".profile-header .profile-name");
  var actions = document.querySelector(".profile-header .profile-actions");
  var buttons = document.querySelectorAll(".profile-header .profile-actions .btn");
  var buttonContents = document.querySelectorAll(".profile-header .profile-actions .btn .btn-inner");

  var tl = new TimelineMax();
  if (collapsed) {
    var dashOffset = getDashOffset(levelIndicator, completeBar);

    tl.add(TweenMax.to(avatarWrapper, 3, { width: 198, height: 198 }));
    tl.add(TweenMax.to(completeBar, 2, { "stroke-dashoffset": dashOffset }), 0);
    tl.add(TweenMax.to(onlineIndicator, 2, { width: 31, height: 31, "border-width": 6, "margin-top": -6, "margin-left": -6 }), 0);
    tl.add(TweenMax.to(profileName, 3, { "margin-top": 10 }), 0);
    tl.add(TweenMax.to(actions, 3, { "margin-top": 21 }), 0);
    buttons.forEach(function(btn) {
      tl.add(TweenMax.to(btn, 2, { height: 32 }), 0);
    });
    buttonContents.forEach(function(btnInner) {
      tl.add(TweenMax.to(btnInner, 0.75, { opacity: 1 }), 0);
    });
  } else {
    tl.add(TweenMax.to(avatarWrapper, 3, { width: 0, height: 0 }));
    tl.add(TweenMax.to(completeBar, 2, { "stroke-dashoffset": 540.3539364174444 }), 0);
    tl.add(TweenMax.to(onlineIndicator, 2, { width: 0, height: 0, "border-width": 2, "margin-top": 0, "margin-left": 0 }), 0);
    tl.add(TweenMax.to(profileName, 3, { "margin-top": -3 }), 0);
    tl.add(TweenMax.to(actions, 3, { "margin-top": 0 }), 0);
    buttons.forEach(function(btn) {
      tl.add(TweenMax.to(btn, 2, { height: 0, padding: 0 }), 0);
    });
    buttonContents.forEach(function(btnInner) {
      tl.add(TweenMax.to(btnInner, 0.75, { opacity: 0 }), 0);
    });
  }

  tl.timeScale(timeScale || 2);
}

var page = document.querySelector(".page-profile");
var swipeUpListener, swipeDownListener;

function enableSwipeUpListener() {
  swipeUpListener = new Hammer.Manager(page, { touchAction: "auto" });
  swipeUpListener.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_UP }));

  page.style.touchAction = "pan-up";

  swipeUpListener.on("swipeup", function() {
    swipeUpListener.destroy();
    enableSwipeDownListener();
    tweenProfileHeader();
  });
}

function enableSwipeDownListener() {
  swipeDownListener = new Hammer.Manager(page, { touchAction: "auto" });
  swipeDownListener.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_DOWN }));

  page.style.touchAction = "pan-down";

  swipeDownListener.on("swipedown", function() {
    swipeDownListener.destroy();
    enableSwipeUpListener();
    tweenProfileHeader(true);
  });
}

if (page) {
  enableSwipeUpListener();
}

/**
 * Stat Meters
 */
var statColumns = document.querySelectorAll(".stat-meter-column");

if (statColumns) {
  statColumns.forEach(function(col) {
    var colValue = parseInt(col.getAttribute("data-count"));
    var colMax = parseInt(col.getAttribute("data-max-count"));
    var parentHeight = col.parentNode.clientHeight;

    var countPercent = colValue / colMax;

    TweenMax.to(col, 2 * countPercent, { height: parentHeight * countPercent });
  });
}

/**
 * Modals
 */
function openModal(selector) {
  document.querySelector(selector).classList.add("active");
}

function closeModal() {
  document.querySelector(".modal.active").classList.remove("active");
}

function closeShareModal() {
  document.querySelector(".social-share-modal.active").classList.remove("active");
}

/**
 * Achievement Badges
 */
var achievements = document.querySelectorAll(".achievement .level-indicator");

if (achievements) {
  var badgeTl = new TimelineMax();
  achievements.forEach(function(badge) {
    if (!parseInt(badge.getAttribute("data-percentage"))) return;

    var completeBar = badge.querySelector(".complete");
    var dashOffset = getDashOffset(badge, completeBar);
    badgeTl.to(completeBar, 1, { "stroke-dashoffset": dashOffset }, 0);
  });
}

/**
 * Show loader
 */
var showLoadingIndicator = function() {
  var indicator = document.querySelector(".loading-indicator");
  indicator.classList.toggle("active");
};

/**
 * Setting Toggle Class Updater
 */
var toggleSettingClass = function(e) {
  var input = e.currentTarget;
  var parent = input.parentElement;
  while (parent.parentElement && (!parent || !parent.classList.contains("setting-toggle"))) {
    parent = parent.parentElement;
  }

  if (parent && parent.classList.contains("setting-toggle")) parent.classList.toggle("on");
};

/**
 * Setting Toggle Class Updater
 */
var toggleCheckboxClass = function(e) {
  var input = e.currentTarget;
  var parent = input.parentElement;
  while (parent.parentElement && (!parent || !parent.classList.contains("checkbox"))) {
    parent = parent.parentElement;
  }

  if (parent && parent.classList.contains("checkbox")) parent.classList.toggle("checked");
};

/**
 * Custom select
 */
var customSelects = document.querySelectorAll(".custom-select");

if (customSelects) {
  customSelects.forEach(function(el) {
    el.addEventListener("change", function(e) {
      var val = e.target.value;
      if (val) el.classList.add("selected");
    });
  });
}

/**
 * Notifications page
 */
var notificationsPage = document.querySelector(".page-notifications");
var notificationsSwipeUpListener, notificationsSwipeDownListener;

function enableNotificationsSwipeUpListener() {
  notificationsSwipeUpListener = new Hammer.Manager(notificationsPage, { touchAction: "auto" });
  notificationsSwipeUpListener.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_UP }));

  notificationsPage.style.touchAction = "pan-up";

  notificationsSwipeUpListener.on("swipeup", function() {
    notificationsSwipeUpListener.destroy();
    enableNotificationsSwipeDownListener();
    document.querySelector(".clear").classList.remove("show");
  });
}

function enableNotificationsSwipeDownListener() {
  notificationsSwipeDownListener = new Hammer.Manager(notificationsPage, { touchAction: "auto" });
  notificationsSwipeDownListener.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_DOWN }));

  notificationsPage.style.touchAction = "pan-down";

  notificationsSwipeDownListener.on("swipedown", function() {
    notificationsSwipeDownListener.destroy();
    enableNotificationsSwipeUpListener();
    document.querySelector(".clear").classList.add("show");
  });
}

if (notificationsPage) {
  enableNotificationsSwipeDownListener();
}

/**
 * Messages page
 */
var messages = document.querySelectorAll(".message-item");

if (messages) {
  messages.forEach(function(message) {
    var mc = new Hammer(message);
    mc.on("swipeleft", function(e) {
      message.classList.add("swiped");
    });

    mc.on("swiperight", function(e) {
      message.classList.remove("swiped");
    });
  })
}

/**
 * Account page
 */
var partnerProgressBar = document.querySelector(".partner-progress .progress-bar");

if (partnerProgressBar) {
  var percentComplete = partnerProgressBar.getAttribute("data-progress-percent") + "%";
  partnerProgressBar.style.setProperty("--progress-bar-percent", percentComplete);
}

/**
 * Edit Profile Page
 */

var platformsSelect = document.querySelector(".platforms-select");

if (platformsSelect) {
  platformsSelect.addEventListener("click", function(e) {
    e.preventDefault();
    openModal("#platforms-modal");
  })
}
