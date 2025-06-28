# -*- coding:utf-8 -*-

from bottle import route, run, template

@route('/heyagime')


def heyagime():

    #初期

    A1 = [1,2,3]
    A2 = [4,3,5]
    A3 = [66,77,3]

    
    # 指名数
    n1 = int(input("A1枠数: "))
    n2 = int(input("A2枠数: "))
    n3 = int(input("A3枠数: "))

    # 指名
    print("A1指名:")
    for i in range(n1):
        val = int(input(f"A1[{i}] = "))
        A1.append(val)


    print("A2指名:")
    for i in range(n2):
        val = int(input(f"A2[{i}] = "))
        A2.append(val)

    # A3のデータ入力
    print("A3指名:")
    for i in range(n3):
        val = int(input(f"A3[{i}] = "))
        A3.append(val)

    # 指名表示
    print("\n各ブロック指名:")
    print("A1 =", A1)
    print("A2 =", A2)
    print("A3 =", A3)

    # 確定枠確認のため集合化
    set1 = set(A1)
    set2 = set(A2)
    set3 = set(A3)

    # 確定枠検索
    unique_A1 = set1 - (set2 | set3)
    unique_A2 = set2 - (set1 | set3)
    unique_A3 = set3 - (set1 | set2)

    # 結果表示
    print("\n確定枠:")
    print("A1:", sorted(list(unique_A1)))
    print("A2:", sorted(list(unique_A2)))
    print("A3:", sorted(list(unique_A3)))

    # バッティングリストアップ
    all_values = set1 | set2 | set3
    print("\n指名被り:")
    for val in sorted(all_values):
        in_lists = []
        if val in set1:
            in_lists.append("A1")
        if val in set2:
            in_lists.append("A2")
        if val in set3:
            in_lists.append("A3")
        
        if len(in_lists) >= 2:
            print(f"No. {val} は {', '.join(in_lists)} で被り")

        A1_kakutei = str(list(unique_A1))
        A2_kakutei = ""
        
    
    return template('250422_kurasys_01', A1_kakutei=A1)

run(host='0.0.0.0', port=8080, debug=True)
