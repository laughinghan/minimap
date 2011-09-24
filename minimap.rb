require 'sinatra'
require 'erubis'

#templates are just in .
set :views, File.dirname(__FILE__)

get '/' do
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end

get '/dev' do
  @dev = true
  @url = request.query_string
  erb @url.empty? ? :minimap : :iframe
end
