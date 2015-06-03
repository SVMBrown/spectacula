class FriendshipsController < ApplicationController

def create
  @friendship = current_user.friendships.build(:friend_id => params[:friend_id])
  if @friendship.save
    redirect_to root_url, :notice => "#{user.handle} has been added"
  else
    render :action => 'new'
  end
end

def destroy
  @friendship = Friendship.find(params[:id])
  @friendship.destroy
  redirect_to root_url, :notice => "#{user.handle} has been removed from your friends list."
  end
end
