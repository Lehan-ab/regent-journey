import re

file_path = "src/data/chaptersData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

CHAPTER_NPC_MAP = {
    '"loc-gateway"': '"gatekeeper-aaron"',
    '"loc-rotary-roots"': '"archivist"',
    '"loc-rotaract-harbor"': '"port-master-kael"',
    '"loc-regent-keep"': '"keeper"',
    '"loc-seven-realms"': '"avenue-guide"',
    '"loc-project-forge"': '"builder"',
    '"loc-codewood"': '"scholar"',
    '"loc-grand-archive"': '"librarian-vanya"',
    '"loc-impact-frontier"': '"scout-mira"',
    '"loc-membership-citadel"': '"high-regent"',
}

for ch_key, npc_id in CHAPTER_NPC_MAP.items():
    # Find chapter block
    pattern = rf'({re.escape(ch_key)}:\s*\{{\s*id:\s*{re.escape(ch_key)},\s*chapterNumber:\s*\d+,\s*chapterLabel:\s*"[^"]+",\s*chapterTitle:\s*"[^"]+",\s*worldName:\s*"[^"]+",\s*regionTitle:\s*"[^"]+",)'
    match = re.search(pattern, content)
    if match:
        original = match.group(1)
        if "guideNpc:" not in original:
            replacement = original + f'\n    guideNpc: {npc_id},'
            content = content.replace(original, replacement, 1)
            print(f"Added guideNpc: {npc_id} to {ch_key}")
        else:
            print(f"guideNpc already present in {ch_key}")
    else:
        print(f"Could not match pattern for {ch_key}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Finished updating chaptersData.ts")
