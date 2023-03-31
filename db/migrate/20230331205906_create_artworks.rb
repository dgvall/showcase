class CreateArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :title
      t.string :image_url
      t.integer :user_id
      t.timestamps
    end
  end
end
