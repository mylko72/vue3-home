<template>
	<div class="container py-5">
		<div class="col-md-10 toy-project">
			<figure class="img-cover">
					<div class="inner"><a href="http://my-todo.surge.sh/html/index.html" target="_blank"><img src="/src/assets/images/img_time_capsule.jpg" alt="Time Capsule" /></a></div>
					<figcaption><em>Time Capsule, <a href="http://my-todo.surge.sh/html/index.html" target="_blank">http://my-todo.surge.sh/html/index.html</a></em></figcaption>
			</figure>
															
			<div class="conts">
					<h3>1. 시간을 기록하다. Time Capsule</h3>
					<p>Time Capsule은 2016년에 코드캐년에 등록할 목적으로 만든 작은 프로젝트이다. 흔한 ToDo 리스트를 타임라인으로 시각화하여 타임라인에 시간과 할일을
							기록하고 히스토리 방식으로 할일을 보여주는 방식으로 UI에 차별화를 주고자 기획했다. 지금은 잘 사용하지 않는 jQuery로 제작이 되었으며 부트스트랩을 제외하고는
다른 라이브러리는 전혀 사용하지 않았다. 물론 백엔드(저장) 기능은 없는 프론트 엔드를 목적으로 제작되었다.</p>
					<p>사용법은 간단하다. 타임라인은 현재 시간을 기준으로 자동 생성이 되며 타임라인 위에 할일을 기록할 시작 시간을 클릭하면 타임라인 위에 포인트가 생성이 되며 마우스로 종료 지점을 선택할 수 있는
Bar가 자동 생성이 된다. 종료 시간을 클릭하면 할일을 기록할 입력 팝업이 오픈된다. 제목과 내용을 입력하고 등록을 클릭하면 아래 리스트가 히스토리 방식으로 노출이 된다.
</p>
					<p>오래 전에 제작한 코드라 바닐라 스크립트 또는 Vue와 같은 프레임워크를 사용하여 리펙토링을 할 계획이다.</p>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped></style>
