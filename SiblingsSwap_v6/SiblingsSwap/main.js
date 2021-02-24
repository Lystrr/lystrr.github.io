var wetgame = null;
var savestates = [];
var loadFromFileHandler;

(function(storyContent) {

    var story = new inkjs.Story(storyContent);
    wetgame = story;

    var storyContainer = document.querySelectorAll('#story')[0];
    var scrollContainer = document.querySelector('#main');
    var statsbar = document.querySelector('#statsbar');
    var sidebar = document.querySelector('#sidebar');
    var statsbar_stats = document.querySelector('#statsbar-stats');
    var statsbar_needs = document.querySelector('#statsbar-needs');
    var statsbar_weekday = document.querySelector('#statsbar-weekday');
    var statsbar_time = document.querySelector('#statsbar-time');
    var statsbar_outfit = document.querySelector('#statsbar-outfit');
    var save_button = document.querySelector('#save-button');
    var save_file_button = document.querySelector('#save-file-button');
    var load_file_button = document.querySelector('#load-file-button');
    var load_file_input = document.querySelector('#load-file-input');
    var saves_div = document.querySelector('#saves');
    var sidebar_button = document.querySelector("#sidebar-button");
    var story_button = document.querySelector("#story-button");
    var stats_button = document.querySelector("#statsbar-button");
    var setting_fade = document.querySelector("#setting-fade");

    var tracked_stats = [];
    var time_hours = 0;
    var time_minutes = 0;

    var animate_text = true;

    var blackboard = null;

    // EXTERNAL function
    function floor(number) {
      return Math.floor(number);
    }
    story.BindExternalFunction("floor", floor);

    function save_game() {
      var oldstate = wetgame.state.toJson();
      if(savestates.length >= 5) {
        savestates.pop();
      }
      savestates.unshift([(new Date()).getTime(), oldstate]);
      saveToJson();
      updateSaves();
    }

    loadSettings();

    // Event handlers for buttons
    save_button.addEventListener("click", function(e) {
      save_game();
    }, false);

    save_file_button.addEventListener("click", function() {
      var today = new Date().toISOString().replace(/:/g, "-");

      var expanded_saves = [];
      savestates.forEach(function(save) {
        expanded_saves.push([save[0], JSON.parse(save[1])]);
      });
      saveToFile(expanded_saves, "SiblingsSwap_saves_" + today + ".json");
    });

    load_file_button.addEventListener("click", function() {
      load_file_input.click();
    });

    sidebar_button.addEventListener("click", function(e) {
      document.querySelectorAll(".icon-button").forEach(function(ib) {
        ib.classList.remove("active");
      });
      sidebar_button.classList.add("active");

      sidebar.classList.remove("inactive");
      scrollContainer.classList.add("inactive");
      statsbar.classList.add("inactive");
      
    }, true);
    story_button.addEventListener("click", function(e) {
      document.querySelectorAll(".icon-button").forEach(function(ib) {
        ib.classList.remove("active");
      });
      story_button.classList.add("active");

      sidebar.classList.add("inactive");
      scrollContainer.classList.remove("inactive");
      statsbar.classList.add("inactive");
    }, true);
    stats_button.addEventListener("click", function(e) {
      document.querySelectorAll(".icon-button").forEach(function(ib) {
        ib.classList.remove("active");
      });
      stats_button.classList.add("active");

      sidebar.classList.add("inactive");
      scrollContainer.classList.add("inactive");
      statsbar.classList.remove("inactive");
    }, true);

    // Settings buttons
    setting_fade.addEventListener("click", function(e) {
      //e.preventDefault();
      //e.stopPropagation();
      setting_fade.querySelector("input").checked = !animate_text;

      if(setting_fade.querySelector("input").checked) {
        // enable fade
        animate_text = true;
      } else {
        // disable fade
        animate_text = false;
      }

      saveSettings();
    }, true);

    // observers
    // trackStat(varname, displayname, type, max)
    trackStat("money_cash", "money", "stat");

    trackStat("needs_arousal", "arousal", "stat", 100);

    trackStat("needs_hunger", "hunger", "stat", 720);
    trackStat("needs_shower", "shower", "stat", 100);
    trackStat("needs_pee", "pee", "stat", 100);
    trackStat("needs_breath", "breath", "stat", 100);
    trackStat("needs_pain", "pain", "stat", 100);
    trackStat("needs_study", "study", "stat", 100);
    trackStat("fitness", "fitness", "stat", 100);

    wetgame.state.story.ObserveVariable("weekday", function(vn, result) {
      statsbar_weekday.innerText = result;
    });
    wetgame.state.story.ObserveVariable("time_hours", function(vn, result) {
      time_hours = result;
      statsbar_time.innerText = formatTime(result, time_minutes);
    });
    wetgame.state.story.ObserveVariable("time_minutes", function(vn, result) {
      time_minutes = result;
      statsbar_time.innerText = formatTime(time_hours, result);
    });
    // Update time
    statsbar_weekday.innerText = wetgame.state.variablesState.GetVariableWithName("weekday").value;
    time_hours = wetgame.state.variablesState.GetVariableWithName("time_hours").value;
    time_minutes = wetgame.state.variablesState.GetVariableWithName("time_minutes").value;
    statsbar_time.innerText = formatTime(time_hours, time_minutes);

    // outfit
    var change_outfit_to = {
      "type": 1,
      "casual": 0,
      "work": 0,
      "nightie": 0,
      "casual_dress": -1,
      "sports": -1
    };
    function updateOutfit() {
      var img = document.createElement("img");
      var path = "";
      switch (change_outfit_to.type) {
        case 0:
          path = "outfit_naked.jpg"
          break;
        case 1:
          path = "outfit_nightie_" + change_outfit_to.nightie + ".jpg"
          break;
        case 2:
          path = "outfit_casual_" + change_outfit_to.casual + ".jpg"
          break;
        case 3:
          path = "outfit_work_" + change_outfit_to.work + ".jpg"
          break;
        case 4:
          path = "outfit_casual_dress_" + change_outfit_to.casual_dress + ".jpg"
          break;
        case 5:
          path = "outfit_sports_" + change_outfit_to.sports + ".jpg"
          break;
      }
      img.src = "media/" + path;
      statsbar_outfit.innerHTML = "";
      statsbar_outfit.appendChild(img);
    }
    wetgame.state.story.ObserveVariable("clothes_current", function(vn, result) {
      change_outfit_to.type = result;
      updateOutfit();
    });
    wetgame.state.story.ObserveVariable("clothes_casual", function(vn, result) {
      change_outfit_to.casual = result;
      updateOutfit();
    });
    wetgame.state.story.ObserveVariable("clothes_work", function(vn, result) {
      change_outfit_to.work = result;
      updateOutfit();
    });
    wetgame.state.story.ObserveVariable("clothes_nightie", function(vn, result) {
      change_outfit_to.nightie = result;
      updateOutfit();
    });
    wetgame.state.story.ObserveVariable("clothes_casual_dress", function(vn, result) {
      change_outfit_to.casual_dress = result;
      updateOutfit();
    });
    wetgame.state.story.ObserveVariable("clothes_sports", function(vn, result) {
      change_outfit_to.sports = result;
      updateOutfit();
    });
    updateOutfit();
    

    // load saves
    loadFromJson();

    function formatTime(hours, minutes) {
      var padded;
      if (minutes < 10) {
        padded = "0" + minutes;
      } else {
        padded = "" + minutes;
      }
      return "" + hours + ":" + padded
    }

    function trackStat(varname, displayname, type, max) {
      var el_div = document.createElement("div");
      el_div.setAttribute("class", "stat");
      var el_span = document.createElement("span");
      el_span.setAttribute("id", "span-" + displayname);
      el_div.innerText = displayname + ": ";
      var progress = null;

      //el_span.innerText = wetgame.state.variablesState.GetVariableWithName(varname).value;
      if(typeof max != "undefined") {
        progress = document.createElement("progress");
        progress.setAttribute("max", max);
        progress.setAttribute("value", wetgame.state.variablesState.GetVariableWithName(varname).value);
        var spacer = document.createElement("div");
        spacer.setAttribute("class", "spacer");
        el_div.appendChild(spacer);
        el_div.appendChild(el_span);
        el_div.appendChild(progress);

        wetgame.state.story.ObserveVariable(varname, function(vn, result) {
          //el_span.innerText = result;
          progress.setAttribute("value", result);
        });
      } else {

        el_div.appendChild(el_span);

        wetgame.state.story.ObserveVariable(varname, function(vn, result) {
          el_span.innerText = result;
        });
        el_span.innerText = wetgame.state.variablesState.GetVariableWithName(varname).value;
      }

      if(type == "need") {
        statsbar_needs.appendChild(el_div);
      } else {
        statsbar_stats.appendChild(el_div);
      }

      tracked_stats.push({"name": varname, "el": el_span, "progress": progress});
    }

    function saveToJson() {
      localStorage.setItem("siblingsswap1", JSON.stringify(savestates));
    }

    function loadFromJson() {
      var loaded = null;
      if(loaded = localStorage.getItem("siblingsswap1")) {
        savestates = JSON.parse(loaded);
        updateSaves();
      }
    }

    function loadSettings() {
      var setting = null;

      // text fade animation
      setting = JSON.parse(localStorage.getItem("siblingsswap-setting-animate-text"));
      if(setting === null) {
        animate_text = true;
      } else {
        animate_text = setting;
      }
      console.log(setting)
      setting_fade.querySelector("input").checked = animate_text;
    }

    function saveSettings() {
      localStorage.setItem("siblingsswap-setting-animate-text", animate_text); // text fade animation
    }

    function addNewVariables(storyjson) {
      var parsed = JSON.parse(storyjson);
      new_vars = [
        ["money_cash", 2000],
        ["money_bank", 0],
        ["exhibitionism", 0],
        ["meet_james_day", 0],
        ["meet_james_hour", 0],
        ["meet_yvonne_day", 0],
        ["meet_yvonne_hour", 0],
        ["mansion_score", 0],
        ["cum_face", 0],
        ["cum_tits", 0],
        ["cum_stomach", 0],
        ["cum_pussy", 0],
        ["cum_ass", 0],
        ["cum_back", 0],
        ["creampie_anal", 0],
        ["creampie_pussy", 0],
        ["relationship_james", 30],
        ["player_location", null],
        ["fitness", 10],
        ["movies_action", 0],
        ["movies_fantasy", 0],
        ["movies_romance", 0],
        ["movies_adult_straight", 0],
        ["movies_adult_lesbian", 0],
        ["clothes_casual_dress", -1],
        ["clothes_sports", -1],
        ["clothes_nightie", 0],
        ["weekly_class_art", 0],
        ["weekly_class_cs", 0]
      ];

      new_vars.forEach(function(variable) {
        if (typeof parsed.variablesState[variable[0]] === "undefined") {
          parsed.variablesState[variable[0]] = variable[1];
        }
      });

      return JSON.stringify(parsed);
    }

    function updateSaves() {
      saves_div.innerHTML = "";
      savestates.forEach(function(item, item_index) {
        var save = document.createElement("p");
        save.innerText = new Date(item[0]).toLocaleString();

        var load_button = document.createElement("button");
        load_button.innerText = "Load";
        load_button.addEventListener("click", function(e) {
          loadSave(item[1]);
        }, false);
        save.appendChild(load_button);

        saves_div.appendChild(save);
      });
    }

    function loadSave(content) {
      wetgame.state.LoadJson(addNewVariables(content));

      tracked_stats.forEach(function(stat) {
        if(stat.progress != null) {
          stat.progress.setAttribute("value", wetgame.state.variablesState.GetVariableWithName(stat.name).value);
        } else {
            stat.el.innerText = wetgame.state.variablesState.GetVariableWithName(stat.name).value;
        }
      });

      // Update time
      statsbar_weekday.innerText = wetgame.state.variablesState.GetVariableWithName("weekday").value;
      time_hours = wetgame.state.variablesState.GetVariableWithName("time_hours").value;
      time_minutes = wetgame.state.variablesState.GetVariableWithName("time_minutes").value;
      statsbar_time.innerText = formatTime(time_hours, time_minutes);

      // outfit
      change_outfit_to = {
        "type": wetgame.state.variablesState.GetVariableWithName("clothes_current").value,
        "casual": wetgame.state.variablesState.GetVariableWithName("clothes_casual").value,
        "work": wetgame.state.variablesState.GetVariableWithName("clothes_work").value,
        "nightie": wetgame.state.variablesState.GetVariableWithName("clothes_nightie").value,
        "casual_dress": wetgame.state.variablesState.GetVariableWithName("clothes_casual_dress").value,
        "sports": wetgame.state.variablesState.GetVariableWithName("clothes_sports").value
      };
      updateOutfit();

      storyContainer.innerHTML = "";
      var para = document.createElement("p");
      para.innerText = wetgame.currentText;
      storyContainer.append(para);
      showAfter(0, para);
      continueStory();
    }

    function saveToFile(content, filename) {
      var a = document.createElement("a");
      var file = new Blob([JSON.stringify(content, null, 2)], {type: "text/plain"});
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
    }

    loadFromFileHandler = function(filePath) {
      var output = "";
      var reader = new FileReader();
      if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
          output = e.target.result;
          var expanded_saves = JSON.parse(output);
          savestates = [];
          expanded_saves.forEach(function(save) {
            savestates.push([save[0], JSON.stringify(save[1])]);
          });
          saveToJson();
          updateSaves();
        }
        reader.readAsText(filePath.files[0]);
      }
      filePath.value = "";
    }

    function showAfter(delay, el) {
        if(!animate_text) {
          delay = 0;
        }
        setTimeout(function() { el.classList.add("show") }, delay);
    }

    function scrollDown() {
        var progress = 0.0;
        var start = scrollContainer.pageYOffset || scrollContainer.scrollTop || 0;
        var dist = window.innerHeight * 0.75;
        if( dist < 0 ) return;

        var duration = 300 + 300*dist/100;
        var startTime = null;
        function step(time) {
            if( startTime == null ) startTime = time;
            var t = (time-startTime) / duration;
            var lerp = 3*t*t - 2*t*t*t;
            scrollContainer.scrollTo(0, start + lerp*dist);
            if( t < 1 ) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function scrollToBottom() {
        var progress = 0.0;
        var start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var dist = document.body.scrollHeight - window.innerHeight - start;
        if( dist < 0 ) return;

        var duration = 300 + 300*dist/100;
        var startTime = null;
        function step(time) {
            if( startTime == null ) startTime = time;
            var t = (time-startTime) / duration;
            var lerp = 3*t*t - 2*t*t*t;
            window.scrollTo(0, start + lerp*dist);
            if( t < 1 ) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function continueStory() {
        storyContainer.innerHTML = "";
        var paragraphIndex = 0;
        var delay = 0.0;
        var paragraphText = "";

        // Generate story text - loop through available content
        while(story.canContinue) {

            // Get ink to generate the next paragraph
            paragraphText = story.Continue();

            // Create paragraph element
            var paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = paragraphText;
            if(blackboard === null) {
              storyContainer.appendChild(paragraphElement);
            } else {
              blackboard.appendChild(paragraphElement);
            }

            // process tags
            if (story.currentTags.length > 0) {
              story.currentTags.forEach(function(tag) {
                var tag_tokens = tag.split(" ");
                var tag_name = "";
                var tag_arg = "";
                tag_name = tag_tokens[0];
                if (tag_tokens.length > 1) {
                  tag_arg = tag_tokens[1];
                }
                switch (tag_name) {
                  case "save":
                    save_game();
                    break;

                  case "media:":
                    var img = document.createElement("img");
                    //img.className = "story-img";
                    img.src = "media/" + tag_arg;
                    storyContainer.insertBefore(img, paragraphElement);
                    showAfter(delay, img);
                    delay += 200.0;
                    break;

                  case "color/all:":
                    paragraphElement.style.color = tag_arg;
                    break;

                  case "blackboard":
                    blackboard = document.createElement("div");
                    blackboard.className = "blackboard";
                    storyContainer.removeChild(paragraphElement);
                    blackboard.appendChild(paragraphElement);
                    storyContainer.appendChild(blackboard);
                    break;

                  case "blackboard/end":
                    blackboard = null;
                    break;

                  case "underline":
                    paragraphElement.classList.add("underline");
                    break;

                  case "color:":
                    paragraphElement.innerHTML = paragraphElement.innerText.replace(/"([^"]*)"/g, function(match) {
                      var color = tag_arg;
                      switch (color) {
                        case "pink":
                          color = "#ea79c8";
                          break;

                        case "grey":
                          color = "#adadad";
                          break;
                      }
                      return '<span style="color: ' + color + ';">' + match + '</span>';
                    });
                    break;
                
                  default:
                    break;
                }
              });
            }

            // Fade in paragraph after a short delay
            showAfter(delay, paragraphElement);

            delay += 200.0;
        }

        if(paragraphText.trim().length > 0) {
          var hrelement = document.createElement('hr');
          storyContainer.appendChild(hrelement);
          delay += 100.0;
          showAfter(delay, hrelement);
        }

        // Create HTML choices from ink choices
        story.currentChoices.forEach(function(choice) {

            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            storyContainer.appendChild(choiceParagraphElement);

            // Fade choice in after a short delay
            showAfter(delay, choiceParagraphElement);
            delay += 200.0;

            // Click on choice
            var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
            choiceAnchorEl.addEventListener("click", function(event) {

                // Don't follow <a> link
                event.preventDefault();

                // Remove all existing choices
                var existingChoices = storyContainer.querySelectorAll('p.choice');
                for(var i=0; i<existingChoices.length; i++) {
                    var c = existingChoices[i];
                    c.parentNode.removeChild(c);
                }

                // Tell the story where to go next
                story.ChooseChoiceIndex(choice.index);

                // Aaand loop
                continueStory();
            });
        });

        //scrollToBottom();
        //scrollDown();
        // scroll to top
        scrollContainer.scrollTo(0, 0);
    }

    continueStory();

})(storyContent);
