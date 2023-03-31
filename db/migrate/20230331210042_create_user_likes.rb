class CreateUserLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :user_likes do |t|
      t.integer :user_id
      t.integer :artwork_id
      t.timestamps
    end
  end
end
