import sys,glob
from PIL import Image
d=sys.argv[1]; fs=sorted(glob.glob(d+'/*.png')); W=4; tw,th=540,675
sh=Image.new('RGB',(W*tw,((len(fs)+W-1)//W)*th),'white')
for i,f in enumerate(fs):
  im=Image.open(f).convert('RGB').resize((tw,th)); sh.paste(im,((i%W)*tw,(i//W)*th))
sh.save(sys.argv[2])
