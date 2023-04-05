class UserLike < ApplicationRecord
  belongs_to :user
  belongs_to :artwork

  validates :user_id, uniqueness: { scope: :artwork_id }
  validate :cant_like_your_own_post

  def cant_like_your_own_post
    if user_id === artwork.user_id
      errors.add(:user, "User can not like owned artwork!")
    end
  end
end
