class SorceryCore < ActiveRecord::Migration
  def change
    create_table :users do |t|

      t.string :handle
      t.string :email,            :null => false
      t.string :crypted_password
      t.string :salt
      t.string :name

      t.timestamps
    end

    add_index :users, :email, :name, unique: true
  end
end
