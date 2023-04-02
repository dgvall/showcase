class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :show]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def profile
    render json: @current_user
  end

  def show
    user = User.find_by(username: params[:username])
    if user
      render json: user, status: :ok
    else
      render json: { errors: ["User does not exist"]}, status: :not_found
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url)
  end

end
