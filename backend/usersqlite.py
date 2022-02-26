import sqlite3


def getproblems():
    conn = sqlite3.connect('admins.db')
    c = conn.cursor()
    c.execute("SELECT rowid,* FROM problems")
    data = c.fetchall()

    conn.commit()
    conn.close()
    return data

def loginuservalid(user):
    conn = sqlite3.connect('admins.db')
    c = conn.cursor() 
    c.execute(f" SELECT rowid,* from users WHERE username LIKE '{user}' ")
    validuser = c.fetchone()
    # print(">>>>>",validuser)
    conn.commit()
    conn.close()
    if validuser:
        return {'id':validuser[0],'username':validuser[1],'password':validuser[2],'firstname':validuser[3], 'lastname':validuser[4],'mobile':validuser[5],'email':validuser[6]}

def getstatus(p,u):
    conn = sqlite3.connect('admins.db')
    c = conn.cursor() 
    c.execute(f"SELECT status FROM problemstatus WHERE pid LIKE {p} AND uid LIKE {u}")
    status = c.fetchone()
    conn.commit()
    conn.close()
    if status:
        return status

def adduser(data):
    # print(">>>>",data)
    conn = sqlite3.connect('admins.db')
    c = conn.cursor()
    c.execute(f" INSERT INTO users VALUES {data} ")
    c.execute(f" SELECT * FROM users WHERE username LIKE '{data[0]}'")
    new = c.fetchone()
    conn.commit()
    conn.close()
    return new


def uservalid(username):
    conn = sqlite3.connect('admins.db')
    c = conn.cursor() 
    c.execute(f" SELECT rowid,username,password,firstname,lastname,email,mobile from users WHERE username LIKE '{username}' ")
    validuser = c.fetchone()
    conn.commit()
    conn.close()
    # print(">>>>>>>",validuser)
    if validuser:
        return {'id':validuser[0],'username':validuser[1],'password':validuser[2],'firstname':validuser[3],'lastname':validuser[4],'email':validuser[5],'mobile':validuser[6]}


def getoneproblem(id):
    conn = sqlite3.connect('admins.db')
    c = conn.cursor()
    c.execute(f" SELECT rowid,* FROM problems WHERE rowid LIKE {id}")
    problem = c.fetchone()
    conn.commit()
    conn.close()
    data = {}
    for p in problem:
        data.update({"id":problem[0],"title":problem[1],"description":problem[2],"solution":problem[3],"difficulty":problem[4],"company":problem[5]})
    return data