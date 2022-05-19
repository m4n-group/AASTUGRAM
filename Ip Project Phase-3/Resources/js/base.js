/*manage sidebar*/
var curSideBar, curMainScreen, curHeader, curFooter;
var curHeader = "mainHeader",
curMainScreen = "home",
curSideBar = "settings",
curFooter = "commentEditor",
curSideBar = "settinsWindow";
var activityStack = [];
var topActivity = -1;
var curSideBar = 'settingsWindow';
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//create datastructures for storing student/user data
/*function User(fname, sex, email, password, 
   lname = "", phone = null, photo = "user.svg",
   groups = [], ownGroups = []) {
      this.fname = fname;
      this.lname = lname;
      this.sex = sex;
      this.phone = phone;
      this.email = email;
      this.password = password;
      this.photo = photo;
      this.groups = groups;
      this.ownGroups = ownGroups;
};

//datastructure for storing information of the groups
function Group (groupName, description, category,  id,
photo = "people.svg", admEmail = null, admPhone = null) {
      this.groupName = groupName;
      this.description = description;
      this.category = category;
      this.photo = "Resources/images/" + photo;
      this.admEmail = admEmail;
      this.admPhone = admPhone;
      this.id = id;
      this.members = members;
};

//a single message has the following data
function Message (content, time, likers = 0, dislikers = 0, comments = []) {
   this.content = content;
   this.likers = likers;
   this.dislikers = dislikers;
   this.time = time;
   this.comments = comments;
};

//datastructure for storing a comment
function Comment (commenter, icon, content= 'this is a template group', time) {
   this.commenter = commenter;
   this.icon = icon;
   this.content = content;
   this.time = time;
}

//datastructure for storing news content
function News (content, sender = "aastusu",
time = new Date().toString.substring(16, 21),
likers = 0, dislikers = 0, comments = []) {
   this.sender = sender;
   this.icon;
   this.content = content;
   this.time = time;
   this.likers = likers;
   this.dislikers = dislikers;
   this.comments = comments;
}

//datastructure for storing admins
function Admin (title, photo="aastu-group.jpg") {
   this.title = title;
   this.photo = photo;
}
*/