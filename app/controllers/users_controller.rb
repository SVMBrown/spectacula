class UsersController < ApplicationController
  skip_before_filter :require_login, only: [:new, :create]
  def new
    @user = User.new
  end

  def edit
    user = edit(params[:email], params[:gender], params[:location], params[:bio], params[:name])
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
    @comment = @user.comments.build
  end
end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :handle, :avatar)
  end
end
