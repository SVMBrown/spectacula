class DropUsernameAndAddUserIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :author_id, :integer
    add_column :comments, :subject_id, :integer
    remove_column :comments, :username
  end
end
