from django.urls import path
from .views import ProfileByUsername,isTwoFA,is_blocked_by, UpdateWalletView,loginUser,setup_email_2fa,confirm_email_2fa,GoogleLogin,Login42,FacebookLogin,GoogleCallback,Callback42,FacebookCallback ,registerUser,ProfileById, deleteUser, updateUsername, sendRequest, AcceptRequest,DenyRequest, DeleteRequest, block, unblock, logoutUser, confirmEmail, userProfile, friendList, friendRequestList, myRequestsList, BlockedList, refreshAccessToken, changePassword, CheckAuthentication, PasswordResetRequestView
from . import views
from .views import GetIdByUsername
from .views import removeFriend
from .views import DenyRequest
from .views import UpdateMatchHistory
from .views import UserMatchHistory
from .views import AvatarUploadView
from .views import is_email_confirmed
urlpatterns = [
	path('users/checkAuthentication/', CheckAuthentication.as_view(), name='CheckAuthentication'),
	path('users/login/', loginUser.as_view(), name='loginUser'),
	path('users/logout/', logoutUser.as_view(), name='logoutUser'),
	path('users/register/', registerUser.as_view(), name='registerUser'),
	path('users/updateUsername/', updateUsername.as_view(), name='updateUsername'),
	path('users/delete/', deleteUser.as_view(), name='deleteUser'),
	path('users/refresh/', refreshAccessToken.as_view(), name='refreshAccessToken'),
	path('users/confirmEmail/', confirmEmail.as_view(), name='confirmEmail'),
	path('users/activate/<uidb64>/<token>/',views.activate, name='activate'),
	path('users/userProfile/', userProfile.as_view(), name='userProfile'),
	path('users/ProfileById/', ProfileById.as_view(), name='ProfileById'),
	path('users/ProfileByUsername/', ProfileByUsername.as_view(), name='ProfileByUsername'),
	path('users/friendList/', friendList.as_view(), name='friendList'),
	path('users/friendRequestList/', friendRequestList.as_view(), name='friendRequestList'),
	path('users/myRequestsList/', myRequestsList.as_view(), name='myRequestsList'),
	path('users/BlockedList/', BlockedList.as_view(), name='BlockedList'),
	path('users/UpdateWallet/', UpdateWalletView.as_view(), name='UpdateWallet'),
	# path('users/resetPassword/', resetPassword.as_view(), name='resetPassword'),
	path('users/changePassword/', changePassword.as_view(), name='changePassword'),
	path('users/isTwoFA/', isTwoFA.as_view(), name='isTwoFA'),
	path('friends/sendRequest/', sendRequest.as_view(), name='sendRequest'),
	path('friends/AccebtRequest/', AcceptRequest.as_view(), name='AccebtRequest'),
	path('friends/DenyRequest/', DenyRequest.as_view(), name='DenyRequest'),
	path('friends/DeleteRequest/', DeleteRequest.as_view(), name='DeleteRequest'),
	path('friends/block/', block.as_view(), name='block'),
	path('friends/unblock/', unblock.as_view(), name='unblock'),
	path('friends/is_blocked/', views.is_blocked.as_view(), name='is_blocked'),
    path('friends/is_blocked_by/', is_blocked_by.as_view(), name='is_blocked_by'),
	path('google_login/', GoogleLogin.as_view(), name='google_login'),
	path('google_callback/', GoogleCallback.as_view(), name='google_callback'),
	path('facebook_login/', FacebookLogin.as_view(), name='facebook_login'),
	path('facebook_callback/', FacebookCallback.as_view(), name='facebook_callback'),
	path('42_login/', Login42.as_view(), name='42_login'),
	path('42_callback/', Callback42.as_view(), name='42_callback'),
	path('password_reset/', PasswordResetRequestView.as_view(), name='password_reset'),
	path('password_reset_confirm/<uid>/<token>/', views.PasswordResetConfirmView, name='password_reset_confirm'),
	path('setup_2fa/', setup_email_2fa.as_view(), name='setup_email_2fa'),
	path('2fa_confirmation/', confirm_email_2fa.as_view(), name='setup_email_2fa'),
	path('users/getIdByUsername/', GetIdByUsername.as_view(), name='get_id_by_username'),
	path('users/removeFriend/', removeFriend.as_view(), name='removeFriend'),
	path('users/UpdateMatchHistory/', UpdateMatchHistory.as_view(), name='UpdateMatchHistory'),
	path('users/UserMatchHistory/', UserMatchHistory.as_view(), name='UserMatchHistory'),
	path('users/UploadAvarar/', AvatarUploadView.as_view(), name='AvatarUploadView'),
	path('users/is_email_confirmed/', is_email_confirmed.as_view(), name='is_email_confirmed'),
]