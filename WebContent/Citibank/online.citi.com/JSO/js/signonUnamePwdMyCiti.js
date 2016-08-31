var signonError = false;
var displaySignonError = false;
var sentForm = 0;
var unameMinLength;
var pwdMinLength;
var vkbSupported=false;
function signOnUnamePwd(clearUsername, validate) {
    if(vkbSupported)
    {
        hideVkb(document.SignonForm.username);
    }
    
    if(sentForm) 
        return false;

    if(document.SignonForm.username.value == gpDashOnCookiedScreen)
    {
        alert(gpErrorOnUserIDSelect);
        document.SignonForm.username.focus();
        return false;
    }
    
    if (document.SignonForm.username.value.length <= 0 || trim(document.SignonForm.username.value).length <= 0)
    {
        alert(gpPlsMyCitiUsrId);
        document.SignonForm.username.value= "";
        if(clearFormOnError)
        { 
            clearSignonScreen(clearUsername);
        }
        try
        {
        	document.SignonForm.username.focus();
        }
        catch(err) { }
        return false;
    }
    
    if (document.SignonForm.password.value.length <= 0 || trim(document.SignonForm.password.value).length <= 0)
    {
        alert(gpPlsMyCitiPass);
        document.SignonForm.password.value = "";
        if(clearFormOnError)
        { 
            clearSignonScreen(clearUsername);
            if (document.SignonForm.username.type == "text")
                document.SignonForm.username.focus();
            else
                document.SignonForm.password.focus();
        }
        else
            document.SignonForm.password.focus();
        return false;
    } 
    
    if (validate==null || validate==true)
    {
        if (document.SignonForm.username.value.length <= unameMinLength)
        {
            alert(gpMyCitiCond);
            if(clearFormOnError)
            { 
                clearSignonScreen(clearUsername);
            }
            document.SignonForm.username.focus();
            return false;
        }

        if (document.SignonForm.password.value.length < pwdMinLength)
        {
            alert(gpMyCitiPassCond);
            if(clearFormOnError)
            { 
                clearSignonScreen(clearUsername);
                if (document.SignonForm.username.type == "text")
                    document.SignonForm.username.focus();
                else
                    document.SignonForm.password.focus();
            }
            else
                document.SignonForm.password.focus();
            return false;
        }
    }

    sentForm = 1;
    return true;
}

function clearSignonScreen(clearUsername)
{
    document.SignonForm.password.value = "";
    if(clearUsername && document.SignonForm.username && document.SignonForm.username.type != "hidden")
    {
        document.SignonForm.username.value = "";
        document.SignonForm.username.focus();
    }
    else
    {
        document.SignonForm.password.focus();
    }
}

function pwdValidation(pwd)
{
    if (pwd.value.length <= 0 || trim(pwd.value).length <= 0) 
    {
        alert(gpPlsMyCitiPass);
        pwd.focus();
        return false;
    } 
    else if (pwd.value.length < pwdMinLength)
    {
        alert(gpMyCitiPassCond);
        pwd.focus();
        return false;
    }
    return true;
}

function usernameValidation(username, validate)
{
    if (username != null && trim(username.value).length == 0)
    {
        alert(usernameEmpty);
        username.value="";
        username.focus();
        return false;
    }
    
    if (validate==null || validate==true)
    {
        if (username.value.length < unameMinLength) 
        {
            alert(gpMyCitiCond);
            username.focus();
            return false;
        }
    }
    return true;
}
function signOnUnamePwdError(clearUsername, validate) {
	
    if(vkbSupported)
    {
        hideVkb(document.SignonForm.username);
    }
    
    if(sentForm) 
        return false;

    if(document.SignonForm.username.value == gpDashOnCookiedScreen)
    {
        alert(gpErrorOnUserIDSelect);
        document.SignonForm.username.focus();
        return false;
    }
    
    if (document.SignonForm.username.value.length <= 0 || trim(document.SignonForm.username.value).length <= 0)
    {
    	enterUserIDTooltip = true;
    	userIDErrorBubble();
        document.SignonForm.username.value= "";
        if(clearFormOnError)
        { 
            clearSignonScreen(clearUsername);
        }
        document.SignonForm.username.focus();
        return false;
    }
    
    if (document.SignonForm.password.value.length <= 0 || trim(document.SignonForm.password.value).length <= 0)
    {
    	enterPwdTooltip = true;
    	pwdErrorBubble();
        document.SignonForm.password.value = "";
        if(clearFormOnError)
        { 
            clearSignonScreen(clearUsername);
            if (document.SignonForm.username.type == "text")
                document.SignonForm.username.focus();
            else
                document.SignonForm.password.focus();
        }
        else
            document.SignonForm.password.focus();
        return false;
    } 
    
    if (validate==null || validate==true)
    {
        if (document.SignonForm.username.value.length <= unameMinLength)
        {
        	 minUIdTooltip = true;
        	 minUserIDErrorBubble();
            if(clearFormOnError)
            { 
                clearSignonScreen(clearUsername);
            }
            document.SignonForm.username.focus();
            return false;
        }

        if (document.SignonForm.password.value.length < pwdMinLength)
        {
        	minPwdTooltip = true;
        	minPwdErrorBubble();
            if(clearFormOnError)
            { 
                clearSignonScreen(clearUsername);
                if (document.SignonForm.username.type == "text")
                    document.SignonForm.username.focus();
                else
                    document.SignonForm.password.focus();
            }
            else
                document.SignonForm.password.focus();
            return false;
        }
    }

    sentForm = 1;
    return true;
}