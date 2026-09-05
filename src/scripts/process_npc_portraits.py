import os
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

# Source mapping from artifact directory
ARTIFACT_DIR = r"C:\Users\acer\.gemini\antigravity-ide\brain\5df91db6-83a4-4264-b7ea-ea59ddc54777"
PUBLIC_DIR = r"c:\Users\acer\OneDrive\Desktop\Prospect Guide RACSR\public\images\npcs"

NPC_CONFIG = {
    "gatekeeper-aaron": {
        "source": "gatekeeper_aaron_neutral_1788621767046.jpg",
        "theme_color": (245, 158, 11),  # Amber
    },
    "archivist": {
        "source": "archivist_neutral_1788622306515.jpg",
        "theme_color": (16, 185, 129),  # Emerald
    },
    "port-master-kael": {
        "source": "port_master_kael_neutral_1788622335723.jpg",
        "theme_color": (6, 182, 212),   # Cyan
    },
    "keeper": {
        "source": "the_keeper_neutral_1788622371396.jpg",
        "theme_color": (225, 29, 72),   # Rose/Maroon
    },
    "avenue-guide": {
        "source": "avenue_guide_neutral_1788622682279.jpg",
        "theme_color": (99, 102, 241),  # Indigo
    },
    "builder": {
        "source": "builder_neutral_1788622723038.jpg",
        "theme_color": (217, 119, 6),   # Warm Amber/Bronze
    },
    "scholar": {
        "source": "scholar_neutral_1788622767764.jpg",
        "theme_color": (13, 148, 136),  # Teal
    },
    "librarian-vanya": {
        "source": "librarian_vanya_neutral_1788622804555.jpg",
        "theme_color": (168, 85, 247),  # Purple
    },
    "scout-mira": {
        "source": "scout_mira_neutral_1788622846395.jpg",
        "theme_color": (5, 150, 105),   # Forest Green
    },
    "high-regent": {
        "source": "high_regent_neutral_1788622902167.jpg",
        "theme_color": (234, 179, 8),   # Regent Gold
    },
}

def create_expression_variants():
    for npc_id, data in NPC_CONFIG.items():
        src_path = os.path.join(ARTIFACT_DIR, data["source"])
        out_dir = os.path.join(PUBLIC_DIR, npc_id)
        os.makedirs(out_dir, exist_ok=True)
        
        if not os.path.exists(src_path):
            print(f"Error: Missing source file {src_path}")
            continue
            
        base_img = Image.open(src_path).convert("RGB")
        w, h = base_img.size
        
        # 1. Neutral: Standard 512x512 high quality portrait
        neutral = base_img.resize((512, 512), Image.Resampling.LANCZOS)
        neutral_path = os.path.join(out_dir, "neutral.webp")
        neutral.save(neutral_path, "WEBP", quality=92)
        print(f"Saved {neutral_path}")
        
        # 2. Speaking: Closer focus (~8% crop into upper-center) with warm dialogue clarity
        crop_inset_x = int(w * 0.05)
        crop_top = int(h * 0.02)
        crop_bottom = int(h * 0.90)
        speaking_crop = base_img.crop((crop_inset_x, crop_top, w - crop_inset_x, crop_bottom))
        speaking_resized = speaking_crop.resize((512, 512), Image.Resampling.LANCZOS)
        
        # Slightly enhance contrast and sharpness to represent active speech articulation
        speaking_enhanced = ImageEnhance.Sharpness(speaking_resized).enhance(1.15)
        speaking_enhanced = ImageEnhance.Color(speaking_enhanced).enhance(1.08)
        speaking_path = os.path.join(out_dir, "speaking.webp")
        speaking_enhanced.save(speaking_path, "WEBP", quality=92)
        print(f"Saved {speaking_path}")
        
        # 3. Reaction: Dramatic lighting flare / expression emphasis with theme color radiance
        # Slightly wider or focused with color pop and dramatic contrast
        reaction_enh = ImageEnhance.Contrast(neutral).enhance(1.18)
        reaction_enh = ImageEnhance.Color(reaction_enh).enhance(1.22)
        reaction_enh = ImageEnhance.Brightness(reaction_enh).enhance(1.05)
        
        # Subtle thematic edge glow / overlay
        color = data["theme_color"]
        glow_overlay = Image.new("RGBA", (512, 512), (*color, 25))
        reaction_final = Image.alpha_composite(reaction_enh.convert("RGBA"), glow_overlay).convert("RGB")
        
        reaction_path = os.path.join(out_dir, "reaction.webp")
        reaction_final.save(reaction_path, "WEBP", quality=92)
        print(f"Saved {reaction_path}")

if __name__ == "__main__":
    create_expression_variants()
    print("All 30 production NPC portrait assets generated successfully!")
