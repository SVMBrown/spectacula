class UsersController < ApplicationController
  skip_before_filter :require_login, only: [:new, :create]
  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

 def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to user_path(@user), :notice => "Edit Successful!"
    else
      render :edit
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_url, :notice => "Signed up!"
    else
      render :new
    end
  end

  def show
    @user = User.find(params[:id])

    if current_user
      @comments = @user.recieved_comments
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :handle, :avatar, :bio)
  end
end
