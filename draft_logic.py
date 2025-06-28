block_names = ["A1", "A2", "A3", "A4", "B12", "B3", "B4", "C12", "C34"]

def process_draft(round_data, winners_map):
    from collections import Counter

    all_member = list(range(100))
    get_dict = {name: [] for name in block_names}
    losers = {} # block_name : 負けた回数

    shimei_dict = {name: round_data.get(name, []) for name in block_names}
    shimei_sets = {name: set(lst) for name, lst in shimei_dict.items()}

    unique_blocks = {}
    for name in block_names:
        others = set().union(*(shimei_sets[n] for n in block_names if n != name))
        unique_blocks[name] = shimei_sets[name] - others
        get_dict[name].extend(unique_blocks[name])
        all_member = [m for m in all_member if m not in unique_blocks[name]]

    conflict_info = []
    for val in sorted(set().union(*shimei_sets.values())):
        blocks = [name for name in block_names if val in shimei_sets[name]]

        # 🟢 競合していない場合は自動で配属
        if len(blocks) == 1:
            winner = blocks[0]
            if val not in get_dict[winner]:
                get_dict[winner].append(val)
            all_member = [m for m in all_member if m != val]
            continue

        # 🟡 競合している場合のみ勝者を求める
        winner = winners_map.get(str(val))
        if winner and winner in blocks:
            if val not in get_dict[winner]:
                get_dict[winner].append(val)
            all_member = [m for m in all_member if m != val]
            for block in blocks:
                if block != winner:
                    losers[block] = losers.get(block, 0)+1

        conflict_info.append({
            "val": val,
            "blocks": blocks,
            "winner": winner
        })

    return {"get_dict": get_dict, "conflicts": conflict_info, "losers":losers}
