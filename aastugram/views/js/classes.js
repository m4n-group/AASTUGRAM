class groupPreviewElement {
	construct(group, chat) {
		this.container = makeElement("div", "group-preview-box");
		this.icon = makeElement("img", null, null, group.photo);
		this.groupInfo = makeElement("div", "group-info");
		this.title = makeElement('h3', null, group.gname);
		this.description = makeElement("span", null, group.members.length + ' member(s)');
		this.description.id = 'description'+chat+group.id;
		if (curUser.groups.indexOf(group.id) == -1) {
			this.joinStatus = 'unjoined';
			this.label = "JOIN";
			this.action = 'joinGroup(\'' + group.id + '\', \''+chat+'\')';
			if (curUser.ownGroups.indexOf(group.id) != -1) {
				this.joinStatus = '';
				this.label = "EDIT";
				this.action = 'activeGroup = groupList[\"' + group.id + '\"], forward(myGroupActivity)';
			}
		}
		else {
			this.joinStatus = '';
			this.label = "VIEW";
			this.action = 'activeGroup = groupList[\"' + group.id + '\"], forward(groupActivity)';
		}
		this.joinButton = makeElement("button", "join-group "+this.joinStatus, this.label, null, this.action );
		this.joinButton.id = 'join'+chat+group.id;
		this.groupInfo.append(this.title, this.description);
		this.container.append(this.icon, this.groupInfo, this.joinButton);
		document.getElementById(chat).appendChild(this.container);
	}
}

class messageContent {
	construct(group) {
		this.container = makeElement("div", "group-preview-box");
		this.icon = makeElement("img", null, null, group.photo);
		this.groupInfo = makeElement("div", "group-info");
		this.title = makeElement('h3', null, group.gname);
		this.description = makeElement("span", null, group.members.length + ' members');
		this.joinButton = makeElement("button", "join-group", 'EDIT', null, 'activeGroup = groupList[\"' + group.id + '\"], forward(myGroupActivity)');
		this.groupInfo.append(this.title, this.description);
		this.container.append(this.icon, this.groupInfo, this.joinButton);
	}
	post(chat) {
		chat.appendChild(this.container);
	}
}

class commentElement {
	construct(comment) {
		this.box = makeElement("div", "comment-box from-bottom");
		this.body = makeElement('div', 'comment-body');
		this.p = makeElement("p", null, comment.content);
		this.icon = makeElement('img', "sender-icon", null, comment.icon);
		this.commenterInfo = makeElement('div', 'commenter-info');
		this.b = makeElement('b', null, comment.commenter);
		this.time = makeElement('small', null, comment.time);
		this.commenterInfo.append(this.b, this.time);
		this.body.append(this.p, this.commenterInfo);
		this.box.append( this.icon, this.body);
	}
	post(chat) {
		chat.appendChild(this.box);
		chat.parentNode.scrollTop = chat.parentNode.scrollHeight;
	}
}

class NewsPreviewElement {
	post(chat) {
		chat.appendChild(this.container);
	}
	construct(news) {
		this.container = makeElement("div", "news-preview-box from-bottom", null, null, 'forward(newsActivity)');
		this.icon = makeElement("img", null, null, news.icon);
		this.newsInfo = makeElement("div", "news-info");
		this.title = makeElement('h1', null, news.senderName);
		this.description = makeElement("p", "news-description", news.content[0].substr(0, 50) + "...");
		this.date = makeElement("small", "date", news.time);
		this.newsInfo.append(this.title, this.description, this.date);
		this.container.append(this.icon, this.newsInfo);
	}
}

class MessageElement {
	construct(message, chat) {
		//alert("Message class called forward(commentActivity, groupList[\""+group.id+"\"]["+message.index+"])");
		this.box = makeElement("div", "message-box from-bottom");
		this.body = makeElement('div', 'message-body');
		this.header = makeElement('div', "message-header");
		this.footer = makeElement('div', "message-footer");
		this.icon = makeElement('img', "sender-icon", null, message.icon);
		this.senderInfo = makeElement('div', 'sender-info');
		this.b = makeElement('b', null, message.senderName);
		this.time = makeElement('small', null, message.time);
		this.comment = makeElement('div',
			'reaction',
			'<img src="Resources/images/svg/chat.svg"><span>' + message.comments.length + '</span>',
			null, "activeMessage = " + message.index + ",forward(commentActivity)");
		var likeSrc = 'Resources/images/svg/thumb-up.svg';
		var dislikeSrc = "Resources/images/svg/thumb-down.svg";
		if (message.likers.includes(curUser.email.substr(0,7))) {
			likeSrc = 'Resources/images/svg/thumb-up-fill.svg';
		}
		else if (message.dislikers.includes(curUser.email.substr(0,7))) {
			dislikeSrc = "Resources/images/svg/thumb-down-fill.svg";
		}
		this.like = makeElement('div', 'reaction', '<img src=\"'+likeSrc+'\" onclick=\'like('+message.index+')\'><span>' + message.likers.length + '</span>');
		this.dislike = makeElement('div','reaction','<img src=\"'+dislikeSrc+'\" onclick=\'dislike('+message.index+')\'><span>' + message.dislikers.length + '</span>');
		this.senderInfo.append(this.b, this.time);
		for (let i of message.content) {
			if (i.substr(0, 3) == 'img') this.body.appendChild(makeElement('img', null, null, i.slice(3)));
			else this.body.appendChild(makeElement('p', null,i));
		}
		this.header.append(this.icon, this.senderInfo);
		this.footer.append(this.like, this.dislike, this.comment);
		this.footer.id = "footer" + activeGroup.id + message.index;
		this.box.append(this.header, this.body, this.footer);
		chat.appendChild(this.box);
		chat.parentNode.scrollTop = chat.parentNode.scrollHeight;
	}
}

class CommentMessage {
	construct(message) {
		this.box = makeElement("div", "message-box from-bottom");
		this.body = makeElement('div', 'message-body');
		this.header = makeElement('div', "message-header");
		this.icon = makeElement('img', "sender-icon", null, message.icon);
		this.senderInfo = makeElement('div', 'sender-info');
		this.b = makeElement('b', null, message.senderName);
		this.time = makeElement('small', null, message.time);
		for (let i of message.content) {
			if (i.substr(0, 3) == 'img') {
				this.body.appendChild(makeElement('img', null, null, i.slice(3)));
			}
			else {
				this.body.appendChild(makeElement('p', null,i));
			}
		}
		this.senderInfo.append(this.b, this.time);
		this.header.append(this.icon, this.senderInfo);
		this.box.append(this.header, this.body);
	}
	post(chat) {
		chat.appendChild(this.box);
	}
}
