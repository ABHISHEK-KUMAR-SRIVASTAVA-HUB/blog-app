@-webkit-keyframes ngdialog-flyin {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes ngdialog-flyin {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@-webkit-keyframes ngdialog-flyout {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    transform: translateY(-40px);
  }
}

@keyframes ngdialog-flyout {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    transform: translateY(-40px);
  }
}

.ngdialog.ngdialog-theme-default {
  padding-bottom: 160px;
  padding-top: 160px;
}

.ngdialog.ngdialog-theme-default.ngdialog-closing .ngdialog-content {
  -webkit-animation: ngdialog-flyout .5s;
  animation: ngdialog-flyout .5s;
}

.ngdialog.ngdialog-theme-default .ngdialog-content {
  -webkit-animation: ngdialog-flyin .5s;
  animation: ngdialog-flyin .5s;
  background: #f0f0f0;
  border-radius: 5px;
  color: #444;
  font-family: 'Helvetica',sans-serif;
  font-size: 1.1em;
  line-height: 1.5em;
  margin: 0 auto;
  max-width: 100%;
  padding: 1em;
  position: relative;
  width: 450px;
}

.ngdialog.ngdialog-theme-default .ngdialog-close {
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
}

.ngdialog.ngdialog-theme-default .ngdialog-close:before {
  background: transparent;
  border-radius: 3px;
  color: #bbb;
  content: '\00D7';
  font-size: 26px;
  font-weight: 400;
  height: 30px;
  line-height: 26px;
  position: absolute;
  right: 3px;
  text-align: center;
  top: 3px;
  width: 30px;
}

.ngdialog.ngdialog-theme-default .ngdialog-close:hover:before,
.ngdialog.ngdialog-theme-default .ngdialog-close:active:before {
  color: #777;
}

.ngdialog.ngdialog-theme-default .ngdialog-message {
  margin-bottom: .5em;
}

.ngdialog.ngdialog-theme-default .ngdialog-input {
  margin-bottom: 1em;
}

.ngdialog.ngdialog-theme-default .ngdialog-input textarea,
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="text"],
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="password"],
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="email"],
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="url"] {
  background: #fff;
  border: 0;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  margin: 0 0 .25em;
  min-height: 2.5em;
  padding: .25em .67em;
  width: 100%;
}

.ngdialog.ngdialog-theme-default .ngdialog-input textarea:focus,
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="text"]:focus,
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="password"]:focus,
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="email"]:focus,
.ngdialog.ngdialog-theme-default .ngdialog-input input[type="url"]:focus {
  box-shadow: inset 0 0 0 2px #8dbdf1;
  outline: none;
}

.ngdialog.ngdialog-theme-default .ngdialog-buttons {
  *zoom: 1;
}

.ngdialog.ngdialog-theme-default .ngdialog-buttons:after {
  content: '';
  display: table;
  clear: both;
}

.ngdialog.ngdialog-theme-default .ngdialog-button {
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  float: right;
  font-family: inherit;
  font-size: .8em;
  letter-spacing: .1em;
  line-height: 1em;
  margin: 0 0 0 .5em;
  padding: .75em 2em;
  text-transform: uppercase;
}

.ngdialog.ngdialog-theme-default .ngdialog-button:focus {
  -webkit-animation: ngdialog-pulse 1.1s infinite;
  animation: ngdialog-pulse 1.1s infinite;
  outline: none;
}

@media (max-width: 568px) {
  .ngdialog.ngdialog-theme-default .ngdialog-button:focus {
    -webkit-animation: none;
    animation: none;
  }
}

.ngdialog.ngdialog-theme-default .ngdialog-button.ngdialog-button-primary {
  background: #3288e6;
  color: #fff;
}

.ngdialog.ngdialog-theme-default .ngdialog-button.ngdialog-button-secondary {
  background: #e0e0e0;
  color: #777;
}