require 'test_helper'

class FriendshipControllerTest < ActionController::TestCase
  test "should get user_id:integer" do
    get :user_id:integer
    assert_response :success
  end

  test "should get friend_id:integer" do
    get :friend_id:integer
    assert_response :success
  end

  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get destroy" do
    get :destroy
    assert_response :success
  end

end
