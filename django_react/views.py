from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required

from backend.accounts.models import User


HTML_DICTIONARY = {
    User.ADMIN_USER_ID: 'core/admin/index.html',
    User.GOD_USER_ID: 'core/god/index.html',
    User.ANONYMOUS_USER_ID: 'core/anonymous/index.html',
}


@login_required()
def core_index(request):
    html_path = HTML_DICTIONARY[request.user.user_type]
    return render_to_response(html_path)

