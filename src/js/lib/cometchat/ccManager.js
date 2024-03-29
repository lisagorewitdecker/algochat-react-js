/**
 * CCManager class : To manage cometchat SDK
 */

import {CometChat} from "@cometchat-pro/chat";

import * as actionCreator from "./../../store/actions/cc_action";


export default class CCManager {
  static cometchat = null;



  static appId  = '31146a328dcd312';   //Enter your App ID
  static apiKey = '3b81feec6299fd91b376eabdf2aacf5f0df5d2d0';  //Enter your API KEY

  static LISTENER_KEY_MESSAGE = "msglistener";
  static LISTENER_KEY_USER = "userlistener";
  static LISTENER_KEY_GROUP = "grouplistener";
  static LISTENER_KEY_CALL = "calllistener";

  static GroupType = {
    'PUBLIC':CometChat.GROUP_TYPE.PUBLIC,
    'PRIVATE':CometChat.GROUP_TYPE.PRIVATE,
    'PASSWORD':CometChat.GROUP_TYPE.PASSWORD
  };
  static userRequest = null;
  static groupRequest = null;

  static init(dispatcher) {

    //initialize cometchat manager
    CometChat.init(this.appId);
  }

  static getInstance() {
    if (CCManager.cometchat == null) {
      CCManager.cometchat = CometChat.init(this.appId);
    }

    return CCManager.cometchat;
  }
  
  static setUserRequestBuilder(limit){
    CCManager.userRequest = new CometChat.UsersRequestBuilder().setLimit(limit).hideBlockedUsers(true).build();
  }

  static setGroupRequestBuilder(limit){
    CCManager.groupRequest = new CometChat.GroupsRequestBuilder().setLimit(limit).build();
  }

  static getTextMessage(uid, text, msgType) {
    if (msgType == "user") {
      return new CometChat.TextMessage(uid, text, CometChat.MESSAGE_TYPE.TEXT, CometChat.RECEIVER_TYPE.USER);
    } else {
      return new CometChat.TextMessage(uid, text, CometChat.MESSAGE_TYPE.TEXT, CometChat.RECEIVER_TYPE.GROUP);
    }
  }

  static getMediaMessage(uid, file, msgType,mediaType) {
    if (msgType == "user") {
      return new CometChat.MediaMessage(uid, file, mediaType, CometChat.RECEIVER_TYPE.USER);
    } else {
      return new CometChat.MediaMessage(uid, file, mediaType, CometChat.RECEIVER_TYPE.GROUP);
    }
  }

  static getCall(uid,callType,userType){
    if(userType == "user"){
      return new CometChat.Call(uid, callType, CometChat.RECEIVER_TYPE.USER);
    }else{
      return new CometChat.Call(uid, callType, CometChat.RECEIVER_TYPE.GROUP);
    }
    
  }
  

  static addMessageListener(dispatch) {
    console.log("ccmangr addMessageListener: ");
    CometChat.addMessageListener(
      this.LISTENER_KEY_MESSAGE,
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          console.log("Incoming Message Log", { message });
          // Handle text message
          this.handleMessage(message, dispatch);
        },
        onMediaMessageReceived: message => {
          console.log("Incoming Message Log", { message });
          // handle media message
          this.handleMessage(message, dispatch);
        },
        
        onMessageDelivered: (messageReceipt) => {
          console.log("MessageDeliverd", {messageReceipt});
          this.handleMessageDelivered(messageReceipt, dispatch);
        },
        
        onMessageRead: (messageReceipt) => {
          console.log("MessageRead", {messageReceipt});
          this.handleMessageRead(messageReceipt, dispatch);
        },

        onTypingStarted: (typingIndicator) => {
          console.log("Typing started :", typingIndicator);
          this.handleStartTyping(typingIndicator,dispatch);
        },
        
        onTypingEnded: (typingIndicator) => {
          console.log("Typing ended :", typingIndicator);
          this.handleEndTyping(typingIndicator,dispatch);
        },

        onMessageDeleted: (message) => {
                   
          this.handleDeleteMessage(message,dispatch);
        },

        onMessageEdited: message => {
          this.handleEditedMessage(message,dispatch);
                  
        }


      })      
    );
  }

  static addUserEventListener(dispatch) {
    try {
      CometChat.addUserListener(
        this.LISTENER_KEY_USER,
        new CometChat.UserListener({
          onUserOnline: onlineUser => {
            console.log("On User Online :=>", { onlineUser });
            //User came online
            this.handleOnUserOnline(onlineUser,dispatch);
          },
          onUserOffline: offlineUser => {
            console.log("On User Offline :=>", { offlineUser });
            //User went offline
            this.handleOnUserOffline(offlineUser,dispatch);
          }
        })
      );
    } catch (err) {
      console.log("User event error ", { err });
    }
  }
  static handleDeleteMessage=(message,dispatch)=>{
    dispatch(actionCreator.deleteMessageReceived(message));
  }

  static handleEditedMessage = (message, dispatch) => {
    console.log("Edited Message", message);    
    dispatch(actionCreator.editMessageReceived(message));

  }

  static handleOnUserOnline = (user,dispatch)=>{
    actionCreator.handleOnUserOnline(user,dispatch);
  }

  static handleOnUserOffline = (user,dispatch)=>{
    actionCreator.handleOnUserOffline(user,dispatch);
  }

  static handleIncomingCall = (call,dispatch) => {
    actionCreator.handleIncomingCall(call, dispatch);
  }

  static handleOutgoinCallAccepted(call,dispatch){
    actionCreator.handleOutgoinCallAccepted(call, dispatch);
  }

  static handleOutgoinCallRejected(call,dispatch){
    actionCreator.handleOutgoinCallRejected(call, dispatch);
  }

  static handleIncomingCancelled(call,dispatch){
    actionCreator.handleIncomingCancelled(call, dispatch);
  }


  static addCallListener(dispatch){
      try {
        CometChat.addCallListener(
          this.LISTENER_KEY_CALL,
          new CometChat.CallListener({
            onIncomingCallReceived: call => {
              
              console.log("Incoming call:", JSON.stringify(call));
              
              this.handleIncomingCall(call,dispatch);
            
            },
           onOutgoingCallAccepted : (call) => {
            
            console.log("Outgoing call accepted:", call);
            // Outgoing Call Accepted
            this.handleOutgoinCallAccepted(call,dispatch);
            
           },
           onOutgoingCallRejected : (call)=> {
            console.log("Outgoing call rejected:", call);
            // Outgoing Call Rejected
            this.handleOutgoinCallRejected(call,dispatch);

           },
           onIncomingCallCancelled :(call)=> {
            console.log("Incoming call calcelled:", call);
            this.handleIncomingCancelled(call,dispatch);
           }
          })
         );
      } catch (error) {
        console.log("Call listener error ", { error });
      }
  }

  static addGroupEventListener(dispatch) {
    try {
      CometChat.addGroupListener(
        this.LISTENER_KEY_GROUP,
        new CometChat.GroupListener({
          onUserJoined: (joinedUser, joinedGroup) => {
            console.log("user joined", { joinedUser, joinedGroup });
            // Handle Event : user joined group
          },
          onUserLeft: (leavingUser, group) => {
            console.log("user left", { leavingUser, group });
            // Handle Event : user left group
          },
          onUserKicked: (kickedUser, kickedBy, kickedFrom) => {
            console.log("user kicked", kickedUser, kickedBy, kickedFrom);
            // Handle Event : bannedUser banned from group by bannedBy
          },
          onUserBanned: (bannedUser, kickedBy, kickedFrom) => {
            console.log("user banned", bannedUser, kickedBy, kickedFrom);
            // Handle Event : kickedUser kicked from group by kickedBy
          },
          onUserUnbanned: (unbannedUser, unbannedBy, unbannedFrom) => {
            console.log(
              "user unbanned",
              unbannedUser,
              unbannedBy,
              unbannedFrom
            );
            // Handle event : unbannedUser unbanned from group by unbannedBy
          }
        })
      );
    } catch (error) {
      console.log("Group event error ", { error });
    }
  }




  

  static handleMessage(message, dispatch) {
    //console.log("ccmangr msg: " + JSON.stringify(message));
    actionCreator.handleMessage(message, dispatch);
  }

  static handleMessageDelivered(message,dispatch){
    actionCreator.handleMessageDelivered(message,dispatch);
  }

  static handleMessageRead(message,dispatch){
    actionCreator.handleMessageRead(message,dispatch);
  }

  static handleStartTyping(typingIndicator,dispatch){
    actionCreator.handleStartTyping(typingIndicator,dispatch);
  }

  static handleEndTyping(typingIndicator,dispatch){
    actionCreator.handleEndTyping(typingIndicator,dispatch);
  }

  static handleActionMessage(action, dispatch) {}

  static messageRequestBuilder(uType,uid, limit) {

    
    var messagesRequest  = "";  

    if(uType == "user"){
      messagesRequest = new CometChat.MessagesRequestBuilder().setUID(uid).setLimit(limit).build();
      
      
    }else{
      messagesRequest = new CometChat.MessagesRequestBuilder().setGUID(uid).setLimit(limit).build();
    }
    
    console.log("mesagerequestbuilder : " + {messagesRequest});

    return messagesRequest;
  }

  static removeListener() {
    CometChat.removeMessageListener(this.LISTENER_KEY_MESSAGE);
    CometChat.removeUserListener(this.LISTENER_KEY_USER);
    CometChat.removeGroupListener(this.LISTENER_KEY_GROUP);
    CometChat.removeCallListener(this.LISTENER_KEY_CALL);
    
  }

  static getGroupMembersRequestBuilder(GUID,limit){
    return new CometChat.GroupMembersRequestBuilder(GUID).setLimit(limit).build();
  }

  static getBlockedUsersRequestBuilder(limit=100){
    return new CometChat.BlockedUsersRequestBuilder().setLimit(limit).build();
  }

}
