const setSideBarScreen = (id) => {
   document.getElementById(curSideBar).style.display = "none";
   document.getElementById(id).style.display = "flex";
   curSideBar = id;
}

const showHideSideBar = () => {
   if (sideBar.style.display == "none") {
      sideBar.style.display = "flex";
   }
   else {
      sideBar.style.display = "none";
   }
}

const closeSideBar = () => {
   sideBar.style.display = "none";
}

const hideShowNavBar = (flag) => {
   if (flag) {
      navBar.style.display = "flex";
   }
   else {
      navBar.style.display = "none";
   }
}

const setMainScreen = (id) => {
   document.getElementById(curMainScreen).style.display = "none";
   document.getElementById(id).style.display = "flex";
   curMainScreen = id;
}

const setHeader = (id) => {
   document.getElementById(curHeader).style.display = "none";
   document.getElementById(id).style.display = "flex";
   curHeader = id;
}

const setFooter = (id) => {
   if (id.length > 0) {
      footer.style.display = "flex";
      document.getElementById(curFooter).style.display = "none";
      document.getElementById(id).style.display = "flex";
      curFooter = id;
   }
   else {
      footer.style.display = "none";
   }
}

const setActivity = (activity) => {
   hideShowNavBar(activity[0]);
   setHeader(activity[1]);
   setMainScreen(activity[2]);
   setFooter(activity[3]);
};

const back = (load = true) => {
   saveChanges();
   return activityStack[--topActivity](load);
};

const mainLoader = () => {
   //main header data
   editPhoto.src = setPh.src = headerProfileIcon.src = curUser.photo;
   headerProfileName.innerHTML = setName.innerHTML = profName.innerHTML = curUser.fname + " " + curUser.lname;
   editFname.value = curUser.fname;
   editLname.value = curUser.lname;
   editPhone.value = curUser.phone;
};

function makeElement(tag, klas = null, content = null, src = null, onclick = null) {
   var element = document.createElement(tag);
   if (klas) { element.className = klas; }
   if (content) { element.innerHTML = content; }
   if (src) { element.src = src; }
   if (onclick) { element.setAttribute('onclick', onclick); }
   return element;
}

function modifyElement(id, klas = null, content = null, src = null, onclick = null) {
   if (klas) {document.getElementById(id).className = klas}
   if (content) {document.getElementById(id).innerHTML = content}
   if (src) {document.getElementById(id).src = src}
   if (onclick) {document.getElementById(id).setAttribute('onclick', onclick)}
}

function comment() {
   var commentField = document.getElementById("commentField");
   var commentWrapper = document.getElementById('commentWrapper');
   if (commentField.value.length == 0) return 0;
   var message = chatList[activeGroup.id][activeMessage];
   var elem = new commentElement();
   var time = new Date();
   var comment = {
      commenter: curUser.fname,
      icon: curUser.photo,
      content: commentField.value,
      time: time.toDateString()
   }
   commentField.value = '';
   if (message.comments.length == 0)
      commentWrapper.removeChild(commentWrapper.lastChild);
   message.comments.push(comment);
   elem.construct(comment);
   elem.post(commentWrapper);
   updateMessage(activeMessage)
}

function showPop(id) {
	document.getElementById(id).style.display = "flex";
	document.getElementById("popHolderWindow").style.display = "flex";
	openedPop = id;
}

function closePopWindow() {
	document.getElementById(openedPop).style.display = "none";
	document.getElementById("popHolderWindow").style.display = "none";
}

function addMediaContent(content) {
   if (['.jpg', '.png', '.svg'].includes(content.slice(content.lastIndexOf('.'), content.length))) {
      content = "img"+content;
   }
   //alert('contents: ' + content);
   messageContents.push(content);
}

function addContent(content) {
   messageContents.push(content);
   editMessageField.value = '';
}

function send(content = []) {
   var messageWrapper = document.getElementById('myMessageWrapper');
   if (content.length == 0) return 0;
   var elem = new MessageElement();
   var time = new Date();
   var message = {
      senderName: curUser.fname,
      icon: curUser.photo,
      content:content,
      time: time.toDateString(), likers: [], dislikers: [], comments: []
   }
   if (!chatList[activeGroup.id] || chatList[activeGroup.id].length == 0) {
      message.index = 0;
      messageWrapper.removeChild(messageWrapper.lastChild);
      chatList[activeGroup.id] = [message];
   }
   else {
      message.index = chatList[activeGroup.id].length;
      chatList[activeGroup.id].push(message);
   }
   messageContents = [];
   elem.construct(message, messageWrapper);
   saveChanges();
   //alert(JSON.stringify(JSON.parse(localStorage.getItem('chatList'))[activeGroup.id]));
}
const saveChanges = () => {
   localStorage.setItem("groupList", JSON.stringify(groupList));
   localStorage.setItem("chatList", JSON.stringify(chatList));
   localStorage.setItem("users", JSON.stringify(users));
}
//activities
const forward = (activity) => {
   saveChanges();
   if (activityStack[topActivity] != activity) {
      activityStack[++topActivity] = activity;
      return activity();
   }
}
function homeActivity(load = true) {
   setActivity(activities[0]);
   setSideBarScreen('settingsWindow');
   closeSideBar();
   newsWrapper.innerHTML = '';
   var newsElement = new NewsPreviewElement();
   for (let news of chatList['news']) {
      newsElement.construct(news);
      newsElement.post(newsWrapper);
   }
   var pane = document.getElementById('featuredGroupsWrapper');
   pane.innerHTML = '';
   var grpObj = new groupPreviewElement();
   var i = 0;
   for (let grp in groupList) {
      if (!curUser.groups.includes(groupList[grp].id)) {
         grpObj.construct(groupList[grp], pane.id);
         ++i;
      }
      if (i >= 10) break;
   }
   return 0;
}
function newsActivity(load = true) {
   setActivity(activities[1]);
   setSideBarScreen('settingsWindow');
   closeSideBar();
   if (!load) return;
   var newsObj;
   var newsPane = document.getElementById('newsFeedWrapper');
   activeGroup = groupList['news'];
   newsPane.innerHTML = "";
   newsObj = new MessageElement();
   for (let i of chatList[activeGroup.id]) {
      newsObj.construct(i,newsPane);
   }
   return;
}
function groupActivity(load = true) {
   setActivity(activities[7]);
   setSideBarScreen('groupInfoWindow');
   closeSideBar();
   grpIcn.src = grpInfoIcn.src = activeGroup.photo;
   groupLabel.innerHTML = grpInfoName.innerHTML = grpInfoTitle.innerHTML = activeGroup.gname;
   grpInfoDescription.innerHTML = activeGroup.description;
   grpInfoMembers.innerHTML = activeGroup.members.length + " members";
   grpInfoEmail.innerHTML = activeGroup.admEmail;
   grpInfoPhone.innerHTML = activeGroup.admPhone;

   var msgObj;
   var msgPane = document.getElementById('messageWrapper');
   msgPane.innerHTML = "";

   msgObj = new MessageElement();
   if (!chatList[activeGroup.id] )
      chatList[activeGroup.id] = [];
   if (chatList[activeGroup.id].length == 0) {
      var elem = '<div class="message-box" style="align-self:center"><div class="message-body"><p>no messages in this group</p></div></div>';
      msgPane.innerHTML += elem;
      return 0;
   }
   for (let i of chatList[activeGroup.id]) {
      msgObj.construct(i,msgPane);
   }
   return 0;
}
function groupsActivity(load = true) {
   setActivity(activities[3]);
   setSideBarScreen('settingsWindow');
   closeSideBar();
   if (!load) return;
   var pane = document.getElementById('ownGroupsWrapper');
   pane.innerHTML = '';
   var grpObj = new groupPreviewElement();
   var count = 0;
   for (let id of curUser.ownGroups) {
      if (groupList[id]) {
         //alert(groupList[id].id);
         grpObj.construct(groupList[id],pane.id);
         count+=1;
      }
   }
   var createGroupElement ='<div  onclick="forward(createGroupActivity)" class="group-preview-box" ><img src="Resources/images/svg/add.svg"><div class="group-info"><h3>create new group</h3></div></div>';
   pane.innerHTML += createGroupElement;
   pane = document.getElementById('joinedGroupsWrapper');
   pane.innerHTML = '';
   var count = 0;
   for (let id of curUser.groups) {
      if (groupList[id]) {
         grpObj.construct(groupList[id], pane.id);
      }
   }
   var createGroupElement ='<div onclick="forward(exploreActivity)" class="group-preview-box" ><img src="Resources/images/svg/add.svg"><div class="group-info"><h3>find groups</h3></div></div>';
   if (!count) {
      pane.innerHTML += createGroupElement;
   }
   return 0;
}
function joinGroup(groupId, chat) {
   curUser.groups.push(groupId);
   groupList[groupId].members.push(curUser.email.substr(0,7));
   updateGroupView(groupId, chat);
}
function leaveGroup(){
   curUser.groups.splice(curUser.groups.indexOf(activeGroup.id), 1);
   activeGroup.members.splice(activeGroup.members.indexOf(curUser.email.substr(0, 7)), 1);
   showHideSideBar();
   back();
}
function deleteGroup(){
   for (let i of activeGroup.members) {
      users[i].groups.splice(users[i].groups.indexOf(activeGroup.id), 1);
   }
   curUser.ownGroups.splice(curUser.ownGroups.indexOf(activeGroup.id), 1);
   delete groupList[activeGroup.id];
}
function myGroupLoader(){
   document.getElementById("myGroupNameHeader").innerHTML = document.getElementById("myGroupNameEdit").value =
   document.getElementById("myGroupNameLabel").innerHTML = activeGroup.gname;
   document.getElementById("myGroupPhotoHeader").src = document.getElementById("myGroupPhotoEdit").src = activeGroup.photo;
   document.getElementById("myGroupDescriptionEdit").innerHTML = activeGroup.description;
   document.getElementById("myGroupMembers").innerHTML = activeGroup.members.length;
   document.getElementById("myGroupPhoneEdit").value = activeGroup.admPhone;
   document.getElementById("myGroupEmailEdit").value = activeGroup.admEmail;
}
function myGroupActivity(load = false) {
   setActivity(activities[6]);
   setSideBarScreen('myGroupInfoWindow');
   closeSideBar();
   myGroupLoader();
   var msgObj;
   var msgPane = document.getElementById('myMessageWrapper');
   msgPane.innerHTML = '';
   msgObj = new MessageElement();
   if (chatList[activeGroup.id].length > 0)
      for (let i of chatList[activeGroup.id]) {
         msgObj.construct(i,msgPane);
      }
   else{
      var elem = '<div class="message-box" style="align-self:center"><div class="message-body"><p>no messages in this group</p></div></div>';
      msgPane.innerHTML += elem;
   }
   return 0;
}
function createGroupActivity(load = true) {
   setActivity(activities[4]);
   setSideBarScreen('settingsWindow');
   closeSideBar();
   return 0;
}
function exploreActivity(load = true) {
   setActivity(activities[2]);
   setSideBarScreen('settingsWindow');
   closeSideBar();
   if (!load) return;
   var grpObj;
   var pane;
   document.getElementById('academic').innerHTML = '';
   document.getElementById('fun and games').innerHTML = '';
   document.getElementById('shopping').innerHTML = '';
   document.getElementById('sports').innerHTML = '';
   document.getElementById('food and drink').innerHTML = '';
   document.getElementById('religion').innerHTML = '';
   document.getElementById('arts and literature').innerHTML = '';
   document.getElementById('scitech').innerHTML = '';

   grpObj = new groupPreviewElement();      
   for (let i in groupList) {
      switch (groupList[i].category) {
         case ('academic'):
            pane = document.getElementById('academic');
            break;
         case ('fun and games'):
            pane = document.getElementById('fun and games');
            break;
         case ('shopping'):
            pane = document.getElementById('shopping');
            break;
         case ('sports'):
            pane = document.getElementById('sports');
            break;
         case ('food and drink'):
            pane = document.getElementById('food and drink');
            break;
         case ('religion'):
            pane = document.getElementById("religion");
            break;
         case ('scienceAndTech'):
            pane = document.getElementById("scitech");
            break;
         default:
            pane = document.getElementById('arts and literature');
      }
      grpObj.construct(groupList[i], pane.id);
   }
   return 0;
}
function commentActivity(load = true) {
   //alert("comment message" + message);
   var message = chatList[activeGroup.id][activeMessage];
   setActivity(activities[5]);
   var commentWrapper = document.getElementById('commentWrapper');
   var commentMessage = new CommentMessage();
   commentWrapper.innerHTML = '';
   commentMessage.construct(message);
   commentMessage.post(commentWrapper);
   commentWrapper.innerHTML += "<span> comments</span><hr style= 'border: solid 1px black; width: 100%'>";

   var comment = new commentElement();

   if (message.comments.length == 0) {
      var elem = '<div class="message-box" style="align-self:center"><div class="message-body"><p>no comments</p></div></div>';
      commentWrapper.innerHTML += elem;
   }
   for (i of message.comments) {
      comment.construct(i);
      comment.post(commentWrapper);
   }
}
function searchActivity(load=true){
   setActivity(activities[8]);
}
function search(key,by='name'){
   document.getElementById('searchQuery1').value = key;
   document.getElementById('searchLabel').innerHTML = 'showing results for: ' + key;
   var pane = document.getElementById('searchWrapper');
   pane.innerHTML = '';
   var grpObj = new groupPreviewElement();
   switch (by) {
      case('name'):
         var count = 0;
         for (let i in groupList) {
            if (groupList[i].gname.indexOf(key) != -1) {
               grpObj.construct(groupList[i], 'searchWrapper');
               count+=1;
            }
         }
         if (count == 0) {
            document.getElementById('searchLabel').innerHTML = 'it seems there is no match for your search';
         };
         break;
      case ('category'):
         var count = 0;
         for (let i in groupList) {
            if (groupList[i].category == key) {
               grpObj.construct(groupList[i], 'searchWrapper');
               count+=1;
            }
         }
         if (count == 0) {
            document.getElementById('searchLabel').innerHTML = 'it seems there is no match for your search';
         };
   }
}

function like(msgIndex){
   if (chatList[activeGroup.id][msgIndex].likers.includes(curUser.email.substr(0,7))) {
      chatList[activeGroup.id][msgIndex].likers.splice(chatList[activeGroup.id][msgIndex].likers.indexOf(curUser.email.substr(0,7)), 1);
   }
   else {
      chatList[activeGroup.id][msgIndex].likers.push(curUser.email.substr(0,7));
      if (chatList[activeGroup.id][msgIndex].dislikers.includes(curUser.email.substr(0,7))) {
         chatList[activeGroup.id][msgIndex].dislikers.splice(chatList[activeGroup.id][msgIndex].dislikers.indexOf(curUser.email.substr(0,7)), 1);
      }   
   }
   updateMessage(msgIndex);
}
function dislike(msgIndex){
   if (chatList[activeGroup.id][msgIndex].dislikers.includes(curUser.email.substr(0,7))) {
      chatList[activeGroup.id][msgIndex].dislikers.splice(chatList[activeGroup.id][msgIndex].dislikers.indexOf(curUser.email.substr(0,7)), 1);
   }
   else {
      chatList[activeGroup.id][msgIndex].dislikers.push(curUser.email.substr(0,7));
      if (chatList[activeGroup.id][msgIndex].likers.includes(curUser.email.substr(0,7))) {
         chatList[activeGroup.id][msgIndex].likers.splice(chatList[activeGroup.id][msgIndex].likers.indexOf(curUser.email.substr(0,7)), 1);
      }   
   }
   updateMessage(msgIndex);
}

function updateMessage(msgIndex){
   var footer = document.getElementById('footer'+activeGroup.id+msgIndex);
   footer.innerHTML = '';
   var message = chatList[activeGroup.id][msgIndex];
   var likeSrc = 'Resources/images/svg/thumb-up.svg';
   var dislikeSrc = "Resources/images/svg/thumb-down.svg";
   if (message.likers.includes(curUser.email.substr(0,7))) {
      likeSrc = 'Resources/images/svg/thumb-up-fill.svg';
   }
   else if (message.dislikers.includes(curUser.email.substr(0,7))) {
      dislikeSrc = "Resources/images/svg/thumb-down-fill.svg";
   }
   var comment = makeElement('div','reaction','<img src="Resources/images/svg/chat.svg"><span>' + message.comments.length + '</span>',
   null, "activeMessage = " + message.index + ",forward(commentActivity)");
   var like = makeElement('div', 'reaction', '<img src=\"'+likeSrc+'\" onclick=\'this.src = like('+message.index+')\'><span>' + message.likers.length + '</span>');
   var dislike = makeElement('label','reaction','<img src=\"'+dislikeSrc+'\" onclick=\'this.src = dislike('+message.index+')\'><span>' + message.dislikers.length + '</span>');
   footer.append(like, dislike, comment);
}

function updateGroupView(groupId, chat){
   var group = groupList[groupId];
   var action, label;
   if (curUser.groups.indexOf(group.id) == -1) {
      label = "JOIN";
      action = 'joinGroup(\'' + group.id + '\', \''+chat+'\')';
   }
   else {
      label = "VIEW";
      action = 'activeGroup = groupList[\"' + group.id + '\"], forward(groupActivity)';
   }
   modifyElement('join'+chat+group.id, "join-group", label, null, action)
   modifyElement('description'+chat+group.id, null, group.members.length + ' member(s)')
}

var activities = [
   [true, "mainHeader", "home", "", homeActivity],
   [true, "mainHeader", "newsFeed", "", newsActivity],
   [true, "mainHeader", "explore", "", exploreActivity],
   [true, "mainHeader", "groups", "", groupsActivity],
   [false, "createGroupHeader", "createGroup", "", createGroupActivity],
   [false, "commentHeader", "comment", "commentEditor", commentActivity],
   [false, "myGroupHeader", "myGroupChat", "messageEditor", myGroupActivity],
   [false, "groupHeader", "groupChat", "", groupActivity],
   [false, "searchHeader", "searchView", "", searchActivity]
]
