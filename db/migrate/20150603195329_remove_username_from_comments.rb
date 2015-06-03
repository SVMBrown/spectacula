class RemoveUsernameFromComments < ActiveRecord::Migration
  def change
    remove_column :comments, :username, :text 
    add_column :comments, :user_id, :integer
  end
end
