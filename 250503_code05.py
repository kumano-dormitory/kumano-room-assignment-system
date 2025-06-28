#ブロック名一覧
block_names = ["A1", "A2", "A3", "A4", "B12", "B3", "B4", "C12", "C34"]

#ブロック名を辞書化
shimei_dict = {name: [] for name in block_names}
kakutei_dict = {name: [] for name in block_names}
get_dict = {name: [] for name in block_names}

#全新入寮生のリストを作製
all_member =  []
for i in range(100):
    val = i
    all_member.append(val)
print(f"全新入寮生 =", all_member)

next_round = True
round_count = 1

while next_round:
    print(f"\n====== {round_count}巡目開始 ======\n")

    #指名初期化
    shimei_dict = {name: [] for name in block_names}

    # 枠数を保存する辞書
    n枠数 = {}

    # 各ブロックの枠数を入力
    for name in block_names:
        n枠数[name] = int(input(f"{name}枠数: "))

    #各ブロックごとに指名
    for name in block_names:
        print(f"{name}指名:")
        i = 0
        while i < n枠数[name]:
            val = int(input(f"{name}[{i}] = "))
            if val in all_member:
                shimei_dict[name].append(val)
                i += 1
            else:
                print(f"その番号は新入寮生にはいません")

    # 指名表示
    print("\n各ブロック指名:")
    for name in block_names:
        print(f"{name}指名:{sorted(shimei_dict[name])}")

    # 確定枠確認のため集合化
    shimei_sets = {name: set(shimei_dict[name]) for name in block_names}

    # 確定枠検索
    unique_blocks = {}

    for name in block_names:
        other_sets = set()  # 他のブロックの集合をまとめる
        for other_name in block_names:
            if other_name != name:
                other_sets |= shimei_sets[other_name]
        unique_blocks[name] = shimei_sets[name] - other_sets

    for name in block_names:
        get_dict[name].extend(unique_blocks[name])


    # 結果表示
    print("\n確定枠:")
    for name in block_names:
        print(f"{name}:", sorted(list(unique_blocks[name])))

    # バッティングリストアップ
    all_values = set()
    for name in block_names:
        all_values |= shimei_sets[name] 

    losers = []

    print("\n指名被り:")
    for val in sorted(all_values):
        in_lists = []
        for name in block_names:
            if val in shimei_sets[name]:
                in_lists.append(name)
        if len(in_lists) >= 2:
            print(f"No. {val} は {', '.join(in_lists)} で被り")
            #じゃんけん
            print(f"{val}をかけて{', '.join(in_lists)}でじゃんけん")
            all_member.remove(val)
            candidate = in_lists
            while True:
                    winner = input("どこが勝った？:")
                    if winner in candidate:
                            break
                    else:
                        print("ブロックじゃないです")
            
        
            print(f"{winner}が{val}を獲得")
            current_losers = [name for name in in_lists if name != winner]
            losers.extend(current_losers) 
            get_dict[winner].append(val)
    

    print(all_member)
    losers = sorted(losers, key=lambda x: block_names.index(x))

    while losers != []:

        #1.5巡目開始

        from collections import Counter

        

        # ① 出現回数カウント
        losers_counter = Counter(losers)  
        # => Counter({'A2': 2, 'A4': 1})

        # ② 重複なしリスト
        candidate_losers = sorted(list(losers_counter.keys()), key=lambda x: block_names.index(x))  
        # => ['A2', 'A4']

        # ③ 1.5巡目の枠数
        n枠数_L = {name: losers_counter[name] for name in losers}
        # => {'A2': 2, 'A4': 1}


        #指名初期化
        shimei_dict_L = {name: [] for name in candidate_losers}

        

        # 各ブロックの枠数を計算
        for name in candidate_losers:

            print(f"{name}の1.5巡目枠数は {n枠数_L[name]} です")

        #各ブロックごとに指名
        for name in candidate_losers:
            print(f"{name}指名:")
            i = 0
            while i < n枠数_L[name]:
                val = int(input(f"{name}[{i}] = "))
                if val in all_member:
                    shimei_dict_L[name].append(val)
                    i += 1
                else:
                    print(f"その番号は新入寮生にはいません")

        # 指名表示
        print("\n各ブロック指名:")
        for name in candidate_losers:
            print(f"{name}指名:{sorted(shimei_dict_L[name])}")

        # 確定枠確認のため集合化
        shimei_sets_L = {name: set(shimei_dict_L[name]) for name in losers}

        # 確定枠検索
        unique_blocks = {}

        for name in losers:
            other_sets = set()  # 他のブロックの集合をまとめる
            for other_name in losers:
                if other_name != name:
                    other_sets |= shimei_sets_L[other_name]
            unique_blocks[name] = shimei_sets_L[name] - other_sets

        for name in candidate_losers:
            get_dict[name].extend(unique_blocks[name])
            

        # 結果表示
        print("\n確定枠:")
        for name in candidate_losers:
            print(f"{name}:", sorted(list(unique_blocks[name])))

        


        # バッティングリストアップ
        all_values = set()
        for name in candidate_losers:
            all_values |= shimei_sets_L[name] 

        llosers = []

        print("\n指名被り:")
        for val in sorted(all_values):
            in_lists = []
            for name in candidate_losers:
                if val in shimei_sets_L[name]:
                    in_lists.append(name)
            if len(in_lists) >= 2:
                print(f"No. {val} は {', '.join(in_lists)} で被り")
                #じゃんけん
                print(f"{val}をかけて{', '.join(in_lists)}でじゃんけん")
                
                candidate = in_lists
                while True:
                        winner = input("どこが勝った？:")
                        if winner in candidate:
                                break
                        else:
                            print("ブロックじゃないです")
                
            
                print(f"{winner}が{val}を獲得")
                get_dict[winner].append(val)

                current_losers = [name for name in in_lists if name != winner]
                llosers.extend(current_losers)  
                print(llosers)
            else:
                pass
            
        losers = llosers
        
    while True:
        yn = input("\n次の巡目に進みますか？ (Y/N): ").strip().upper()
        if yn == "Y":
            round_count += 1
            break  # 次の巡目へ
        elif yn == "N":
            next_round = False
            break  # ループ終了
        else:
            print("YまたはNで答えてください")

#終了
print("KURASYS_finish")
print("\n最終獲得者一覧:")
for name in block_names:
    print(f"{name}: {sorted(get_dict[name])}")



    
        



