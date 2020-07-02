Git 메인 명령어 2020/07/01
Commit
Branch
Checkout
Cherry-pick
Reset
Revert
Rebase
Merge

1-1.Commit
디렉토리에 있는 모든 파일에 대한 스냅샷을 기록하는 것입니다.
디렉토리 전체를 복사하여 붙여넣는것과 유사.
커밋할때 디렉토리 모두를 복사하지 않음
커밋은 저장소 이전버전과 다음버전 변경내역을 저장.
복제를 하려면 변경분을 풀어야함. ==명령어 : resolving delta
git commit
———————————————————————
1-2.Branch
브랜치는 특정 커밋에 대한 참조.
브랜치를 많이 만들어도 메모리나 디스크공간에 부담되지 않음.
커다란브랜치 X 작은 브랜치를 많이만듬.
git branch  브랜치명
git checkout 브랜치명
———————————————————————
1-3.Merge
branch를 합칠 때 사용합니다.
git merge [brach명]
———————————————————————
1-4.Rebase
commit 을 모아서 copy 한 뒤 다른곳에 drop
commit 의 흐름을 한 줄로 만들 수 있음.
commit이 여러개 존재할 경우 rebase시 두개를 합치어 하나의 것으로 바꿉니다.
현재 head에서 대상 branch 를 git rebase [대상branch]
———————————————————————
———————————————————————
2-1.Head
head 는 현재 checkout되어진 commit을 가리킵니다.
항상 작업트리 가장 최근 커밋을 가리킵니다.
———————————————————————
2-2.상대참조
hash가 commit의 고유한 값임을 보여줍니다.
한번에 한 커밋시 이동 : git checkout master^
ex)git checkout C3; git checkout HEAD^;git checkout head^
좌측을 기준으로 우측으로 이동시 ^뒤에 +=1으로 진행
2-3.~연산자
commit tree에서 여러단계 이동하기 위하여 사용. 
ex)git checkout head~4 : 4칸을 위로 이동
8.branch 강제이동
-f 옵션을 이용하여 브랜치를 특정커밋에 직접적으로 재지정 할 수 있습니다.
ex)git branch -f master head~3:master브랜치를 head에서 세번 뒤로 이동하였습니다.
———————————————————————
2-4.git 작업 되돌리기
1.git reset : master가 가리키던 commit을 이동하여 reset한 곳에서 작업한 정보를 삭제 ex)git reset HEAD~1
2.git revert : commit아래에 새로운 commit생성 revert시 다른 사람들에게 변경내역을 push하여 공유할 수 있습니다.
ex)git rever HEAD
———————————————————————
———————————————————————
3-1.git cherry-pick
git cherry-pick [commit][commit][commit]…[commit]
head아래에 존재하는 commit 을 복사본을 생성.
ex)git cherry-pick C2 C4:head에서 C2,C4복사본을 아래에 커밋합니다.
———————————————————————
3-2.interactive rebase
원하는 커밋을 모르는 상황에서 사용합니다. 
rebase 는 -i옵션을 같이 사용합니다.
vim과 같은 텍스트 편집기에서 파일을 엽니다.
 1)적용한 commit들의 순서 ui를 통해 변경가능.
 2)원하지 않는 commit을 뺄 수 있습니다. 이것은 pick를 이용해 지정가능
 3)commit을 스쿼시(squash)를 이용할 수 있습니다. 
ex)git rebase -i head~4:위로 4개의 commit을 설정할 수 있는 UI를 보여줌. 이때 omit을 누르면 이것을 제외하고 나머지 commit을 복사하여 출력.
———————————————————————
———————————————————————
4-1 local 에 쌓인 commit들을 정리
버그 수정후 원래 작업하는 브랜치에 합치기 위하여.
branch1의 내용을 master에 합치려고 하지만 master를 최신 커밋으로 이동시킨다면 불필요한 코드까지 합쳐짐.
git rebase -i
git cherry-pick을 이용하면 문제 해결 가능 
———————————————————————
4-2 rebase -i
새로운 image , caption branch에 각각 변경 내역이 있슴.
이전 커밋의 내용을 살짝 바꿔야 하는 경우.
 1)git rebase -i = 원하는 순서대로 커밋 순서 변경
 2)git commit —amend = 커밋 내용 정정
 3)git rebase -i 커밋 이전순서대로 변경
 4)master를 지금 트리가 변경된 부분으로 이동.
———————————————————————
4-3 cherry-pick
cherry-pick은 현재 HEAD가 위치한 곳에 복사 파일을 입력하면 복사본을 생성합니다.
———————————————————————
5-1GIT태그
프로젝트에서 중요한 작업이력은 영구적으로 표시하기위하여 사용.
주로 사용처 : 주요 릴리즈,큰 브랜치 병합
ex)git tag v1 C1 : C1을 v1으로 태그설정 합니다.
커밋 미지정시 head에 태그
———————————————————————
5-2GIT describe
tag에 비해 상대적으로 어디에 위치해있는지 묘사 해줍니다.
git describe [*ref] *ref=commit 아무곳에서 사용가능
git은 지금 체크아웃 된 곳을 사용합니다.
<tag>_<numCommits>_g<hash>
tag는 가장 가까운 부모 tag.
unmCommits 해당 tag가 몇 commit 멀리 있는지 나타냅니다.
hash는 묘사하고 있는 commit의 hash를 나타냅니다.
ex)git describe master : master에 대한 태그설명.

Git remote  2020/07/02
6-1 git remote
원격 저장소의 역활
 - 백업
 - 공유
push/pull 구별법 : 원격 저장소를 대상으로 생각.


다운로드
—————————————————————————
git clone : 원격 저장소에 저장되어진 코드를 로컬에 저장할때 사용.
원격 브랜치 : git clone 로컬 저장소에 저장이 되어지면 새 브런치 생성.
<원격저장소 명>/<브랜치 명>
주 저장소를 o보다는 orign 으로 이름을 짓는 경우가 많습니다. 
—————————————————————————
git fetch : 원격저장소에서 데이터를 가져오는 작업.
fetch의 역활 
1.원격 저장소에는 존재하나 로컬에 없는 커밋을 다운로드 받습니다.
2.원격 브랜치가 가리키는곳을 업데이트합니다.
!!!git fetch는 로컬작업이 변경되어도 원격 저장소에 업데이트 되지 않습니다
—————————————————————————
git pull
새로운 commit을 (로컬)에서 내려받은 후 다른 브랜치세 있는 일발 커밋처럼 활용가능
git cherry-pick [로컬해당명]
git rebase [로컬해당명]
git merge [로컬 해당명]
이러한 방식이 존재하지만 fetch와merge를 한번에 처리해주는 git pull이 존재합니다.
—————————————————————————
git fakeTeamwork
원격 저장소가 여러 사람들에 의하여 특정 브랜치나 여러개의 커밋이 갱신되는 경우 표현할 필요가 있슴.
git fakeTeamwork = 해당에서 fakeTeamwork에 대하여 붙여넣기 해줌.
git fakeTeamwork [브랜치명] n : 	[브랜치명]에 n개의 commit을 추가해줌.
—————————————————————————

업로드
과제는 upstream의 값으로 사용.
—————————————————————————
git push
내려받은 작업을 업로드하여 공유하는 것입니다.
매개변수 없이 사용할경우 push.default라 불리는 git의 기본 설정에 따라 결정됨.
———————————————————————————
1.월요일에 저장소를 clone해서 부가기능을 제작.
2.금요일에 공개
3.허나 그사이 다른사람이 작업을 push하여 내가 진행한 프로젝트가 구버전이 되어버린
git push하기가 만들어짐
이럴경우 git fetch; git rebase o/master; git push;
fetch와 rebase 명령어 한번에 처리하는법 git pull —reabase
———————————————————————————
원격 장소 거부
원격저장소 master브랜치는 잠겨있어서 pull requeset작업을 거쳐야함.
이때 master브랜치를 커밋한후 push하면
 ! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)

와 같은 오류가 발생합니다.
이유 : master 브랜치에 대한 직접적인 커밋을 제한하기 때문에.
push대신에 pull request 를 쓰여야 한다는 이유이기 때문입니다.
해결 : 브랜치를 따로 만들어 작업한 다음 push한 후 pull requeset를 해야합니다.
실수로 master브랜치에 커밋을하면 push도 못하는 오류 발생,
이경우 feature(임시 작업) 브랜치를 push한 후 동기화 될수 있도로 로컬 저장소를 master브랜치를 reset해줍니다. 
———————————————————————————
브랜치 병합하기.
feature 생성 한 후 준비가 완료되면 master에 통합합니다.
master브랜치 있을때만 push,pull만 진행할 경우, master은 하상 원격 브랜치의 상태와 최신유지를 할 수 있습니다.
1.feature 브랜치 작업을 master과 통합하기.
2.원격 저장소에는 push하고 pull하는 방식.
!!!!!merge를 사용하지 않는 이유
새로운 작업을 원격 저장소에 push하기 위해서는 최근 변경점을 합치기만 하면 되지만.  rebase를 사용합니다.
rebase 
장점 : 커밋 트리를 간편하게 정리
단점 : 커밋 트리의 히스토리를 수정하여
개발 이력을 보존하기 위해서 merge를 사용하기도함.
rebase	merge
하나의 트리에 복사를 하여 직관적이면서 보기에 좋음	 기록을 여러개를 통합하여 진행하여 기록이 남아있슴.
작업을 진행한 히스토리를 수정하여서 기록이 보존되지 않음.	트리가 여러개를 통합 하기 때문에 직관성이 떨어짐.
———————————————————————
원격추적 branch
pull  : 커밋들을 o/master에 내려받아지고 master브랜치로 merge되어짐.
push : master브랜치는 원격의 master브랜치에 push됩니다. push의 목적지는 master와 o/master의 연결에서 결정.

totallynotmaster라는 브랜치에서 git push를 적용하면 원격 저장소 브랜치인 master에 push 할 수 있습니다.
git checkout -b totallyNotMaster o/master
git branch -u o/master foo : foo브랜치가 o/master을 추적하도록 설정합니다.
———————————————————————
push의 인자들
git push <remote> <place>
내저장소의 place라는 이름의 브랜치로 가서. 


