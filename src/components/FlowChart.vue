<template>
    <VFlowChart ref="flowChart" :nodes="nodes" :connections="conns" :footer-style="{ 'margin-left': '35%' }"
        :enableConnContextMenu="true" :enableNodeContextMenu="true" :connLineType="'step'">
        <div slot="nodeContextmenu" slot-scope="props" class="context__container d-inline-flex">
            <div class="context__button">
                <a href="javascript:;" class="context__link my-auto d-inline-flex">
                    <i class="bi bi-circle-fill bg-white"></i><i class="bi bi-caret-down"></i>
                </a>
            </div>
            <div class="context__button">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-border-outer"></i>
                </a>
            </div>
            <div class="context__button">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-type-underline"></i>
                </a>
            </div>
            <div class="context__button" style="width: 550px">
                <select class="form-select" aria-label="Default select example">
                    <option selected>Small</option>
                </select>
            </div>
            <div class="context__button-2" @click="$refs.flowChart.removeNode(props.node.id)">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-trash3"></i>
                </a>
            </div>
        </div>
        <div slot="connContextmenu" class="context__container"></div>

        <div class="toolbar" slot="footer">
            <div class="context__button">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-cursor"></i>
                </a>
            </div>
            <div class="context__button">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-hand-index-thumb"></i>
                </a>
            </div>
            <div class="context__button" @click="$refs.flowChart.addNode()">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-plus-lg"></i>
                </a>
            </div>
            <div class="context__button">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-arrow-counterclockwise"></i>
                </a>
            </div>
            <div class="context__button">
                <a href="javascript:;" class="context__link">
                    <i class="bi bi-arrow-clockwise"></i>
                </a>
            </div>
        </div>
    </VFlowChart>
</template>
<script>
import VFlowChart from "vue2-flow";
export default {
    components: {
        VFlowChart,
    },
    props: {
        nodes: Array,
        conns: Array
    }
}
</script>